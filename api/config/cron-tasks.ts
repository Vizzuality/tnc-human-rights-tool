export default {
  firstWarningNotifications: {
    task: async ({ strapi }) => {
      const today = new Date().toISOString().split('T')[0];

      const firstWarningsToBeSentToday = await strapi.db.query('api::project-deletion.project-deletion').findMany({
        where: {
          first_warning_date: today
        },
        populate: ['project'],
      });

      if(firstWarningsToBeSentToday.length)
        for (const deletion of firstWarningsToBeSentToday) {
          await strapi.plugins['email'].services.email.send({
            to: deletion.user_email,
            subject: `Project ${deletion.project.name} will be deleted in 14 days for security reasons`,
            text: `Your project is scheduled for deletion in 14 days.`,
          });
        }
    },
    options: {
      rule: "0 1 * * *",
    },
  },

  secondWarningNotifications: {
    task: async ({ strapi }) => {
      const today = new Date().toISOString().split('T')[0];

      const secondWarningsToBeSentToday = await strapi.db.query('api::project-deletion.project-deletion').findMany({
        where: {
          second_warning_date: today
        },
        populate: ['project'],
      });

      if(secondWarningsToBeSentToday.length)
        for (const deletion of secondWarningsToBeSentToday) {
          console.log("send second warning")
          await strapi.plugins['email'].services.email.send({
            to: deletion.user_email,
            subject: `Project ${deletion.project.name} will be deleted tomorrow for security reasons`,
            text: `Your project is scheduled for deletion tomorrow.`,
          });
        }
    },
    options: {
      rule: "0 2 * * *",
    },
  },


  deleteProjectOnDeletionDate: {
    task: async ({ strapi }) => {
      const today = new Date().toISOString().split('T')[0];

      const projectsToBeDeletedToday = await strapi.db.query('api::project-deletion.project-deletion').findMany({
        where: {
          deletion_date: today
        },
        populate: ['project'],
      });

      if (projectsToBeDeletedToday.length)
        for (const deletion of projectsToBeDeletedToday) {
          console.log(`Deleting project ${deletion.project.name}`)
          await strapi.db.query('api::project.project').delete({
            where: { id: deletion.project.id }});

          await strapi.db.query('api::project-deletion.project-deletion').update({
            where: { id: deletion.id },
            data: {
              project_deleted: true,
              project: null,
            },
          });

          await strapi.plugins['email'].services.email.send({
            to: deletion.user_email,
            subject: `Project ${deletion.project.name} has been deleted`,
            text: `Your project has been deleted as scheduled.`,
          });
        }
    },
    options: {
      rule: "0 3 * * *",
    },
  },


  scheduleProjectDeletions: {
    task: async ({ strapi }) => {
      const projects = await strapi.db.query('api::project.project').findMany({
        populate: ['author'],
      });

      for (const project of projects) {
        const existingDeletion = await strapi.db.query('api::project-deletion.project-deletion').findOne({
          where: {
            project: project.id,
          },
        });

        if (!existingDeletion && project.author) {
          console.log(project.author)
          const createdAt = new Date(project.createdAt);
          const firstWarningDate = new Date(createdAt);
          firstWarningDate.setMonth(firstWarningDate.getMonth() + 5);
          firstWarningDate.setDate(firstWarningDate.getDate() + 14);

          const secondWarningDate = new Date(createdAt);
          secondWarningDate.setMonth(secondWarningDate.getMonth() + 6);
          secondWarningDate.setDate(secondWarningDate.getDate() - 1);

          const deletionDate = new Date(createdAt);
          deletionDate.setMonth(deletionDate.getMonth() + 6);

          await strapi.db.query('api::project-deletion.project-deletion').create({
            data: {
              project: project.id,
              project_name: project.name,
              first_warning_date: firstWarningDate.toISOString().split('T')[0],
              second_warning_date: secondWarningDate.toISOString().split('T')[0],
              deletion_date: deletionDate.toISOString().split('T')[0],
              user_email: project.author.email,
            },
          });
        }
      }
    },
    options: {
      rule: "0 0 * * *",
    },
  },
};
