/**
 * pcb-category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::pcb-category.pcb-category', () => ({
  async generateSlugs(ctx) {
    try {
      const pcbCategories = await strapi.db.query('api::pcb-category.pcb-category').findMany({
        where: { locale: 'en' }
      });

      for (const category of pcbCategories) {
        if (category.title) {
          const slug = category.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

          await strapi.db.query('api::pcb-category.pcb-category').update({
            where: { id: category.id },
            data: { slug },
          });
        }
      }
      ctx.body = 'Slugs for pcb categories generated successfully';
    } catch (error) {
      ctx.throw(500, 'An error occurred while generating slugs');
    }
  },
}));
