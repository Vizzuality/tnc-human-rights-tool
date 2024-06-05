export default {
  async afterDelete(event) {
    const { result } = event;
    if (result && result.name) {
      const projectName = result.name;
      await strapi.db.query('api::project-deletion.project-deletion').updateMany({
        where: { project_name: projectName },
        data: {
          project_deleted: true,
        },
      });
    }
  },
}
