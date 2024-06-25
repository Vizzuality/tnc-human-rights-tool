module.exports = {
  async up() {
    await strapi.db.transaction(async () => {
      // Contextual Risk
      const { results: resultsCR } = await strapi.service('api::contextual-risk.contextual-risk').find({
        locale: 'en'
      });

      for (let index = 0; index < resultsCR.length; index++) {
        const cr = resultsCR[index];
        const { id, title } = cr;
        await strapi.service('api::contextual-risk.contextual-risk').update(id, {
          data: {
            title
          }
        });
      }

      // Contextual Risk Category
      const { results: resultsCRC } = await strapi.service('api::contextual-risk-category.contextual-risk-category').find({
        locale: 'en'
      });

      for (let index = 0; index < resultsCRC.length; index++) {
        const cr = resultsCRC[index];
        const { id, title } = cr;
        await strapi.service('api::contextual-risk-category.contextual-risk-category').update(id, {
          data: {
            title
          }
        });
      }

      // Pcb
      const { results: resultsPCB } = await strapi.service('api::pcb.pcb').find({
        locale: 'en'
      });

      for (let index = 0; index < resultsPCB.length; index++) {
        const cr = resultsPCB[index];
        const { id, title } = cr;
        await strapi.service('api::pcb.pcb').update(id, {
          data: {
            title
          }
        });
      }

      // Pcb Category
      const { results: resultsPCBC } = await strapi.service('api::pcb-category.pcb-category').find({
        locale: 'en'
      });

      for (let index = 0; index < resultsPCBC.length; index++) {
        const cr = resultsPCBC[index];
        const { id, title } = cr;
        await strapi.service('api::pcb-category.pcb-category').update(id, {
          data: {
            title
          }
        });
      }
    });
  },
};