import firstWarningEmailTemplate from "./templates/first-warning-template";
import secondWarningEmailTemplate from "./templates/second-warning-template";
import deletionWarningEmailTemplate from "./templates/deletion-warning-template";

export default {
  firstWarningNotifications: {
    task: async ({ strapi }) => {
      const today = new Date().toISOString().split('T')[0];

      const firstWarningsToBeSentToday = await strapi.db.query('api::project-deletion.project-deletion').findMany({
        where: {
          first_warning_date: today,
          first_warning_email_sent: false,
          project_deleted: false
        },
        populate: ['project'],
      });

      if(!firstWarningsToBeSentToday.length) {
        return;
      }

      for (const deletion of firstWarningsToBeSentToday) {
        try {
          const emailBody = firstWarningEmailTemplate(deletion.project.name)
          await strapi.plugins['email'].services.email.send({
            to: deletion.user_email,
            subject: `Project ${deletion.project.name} will be deleted in 14 days for security reasons`,
            html: emailBody,
          });
          await strapi.db.query('api::project-deletion.project-deletion').update({
            where: { id: deletion.id },
            data: {
              first_warning_email_sent: true
            },
          });
        } catch(error) {
          strapi.log.error(`14 days warning email notification for project ${deletion.project.name} has not been sent`)
        }
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
          second_warning_date: today,
          second_warning_email_sent: false,
          project_deleted: false
        },
        populate: ['project'],
      });

      if(!secondWarningsToBeSentToday.length) {
        return;
      }

      for (const deletion of secondWarningsToBeSentToday) {
        try {
          const emailBody = secondWarningEmailTemplate(deletion.project.name)
          await strapi.plugins['email'].services.email.send({
            to: deletion.user_email,
            subject: `Project ${deletion.project.name} will be deleted tomorrow for security reasons`,
            html: emailBody,
          });
          await strapi.db.query('api::project-deletion.project-deletion').update({
            where: { id: deletion.id },
            data: {
              second_warning_email_sent: true
            },
          });
        } catch(error) {
          strapi.log.error(`1 day warning email notification for project ${deletion.project.name} has not been sent`)
        }

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
          deletion_date: today,
          deletion_email_sent: false,
          project_deleted: false
        },
        populate: ['project'],
      });

      if (!projectsToBeDeletedToday.length) {
        return;
      }
      for (const deletion of projectsToBeDeletedToday) {
        try {
          await strapi.db.query('api::project-deletion.project-deletion').update({
            where: { id: deletion.id },
            data: {
              project_deleted: true,
              project: null,
            },
          });
          await strapi.db.query('api::project.project').delete({
            where: { id: deletion.project.id }});
          const emailBody = deletionWarningEmailTemplate(deletion.project.name)
          await strapi.plugins['email'].services.email.send({
            to: deletion.user_email,
            subject: `Project ${deletion.project.name} has been deleted`,
            html: emailBody,
          });
          await strapi.db.query('api::project-deletion.project-deletion').update({
            where: { id: deletion.id },
            data: {
              deletion_email_sent: true
            },
          });
        } catch(error) {
          strapi.log.error(`Deletion of project ${deletion.project.name} has not been successful`)
        }
      }
    },
    options: {
      rule: "0 3 * * *",
    },
  },

  scheduleProjectDeletions: {
    task: async ({ strapi }) => {
      const projects = await strapi.db.query('api::project.project').findMany({
        where: {
          published_at: {
            $notNull: true,
          },
        },
        populate: ['author'],
      });

      for (const project of projects) {
        const existingDeletion = await strapi.db.query('api::project-deletion.project-deletion').findOne({
          where: {
            project: project.id,
          },
        });

        if (!existingDeletion && project.author && project.author.email) {
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
