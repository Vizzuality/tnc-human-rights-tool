/**
 * pcb controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::pcb.pcb', () => ({
  async generateSlugs(ctx) {
    try {
      const pcbs = await strapi.db.query('api::pcb.pcb').findMany({
        where: { locale: 'en' }
      });

      for (const pcb of pcbs) {
        if (pcb.title) {
          const slug = pcb.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');

          // Update the PCB with the new slug
          await strapi.db.query('api::pcb.pcb').update({
            where: { id: pcb.id },
            data: { slug },
          });
        }
      }

      ctx.body = 'Slugs for pcbs generated successfully';
    } catch (error) {
      ctx.throw(500, 'An error occurred while generating slugs');
    }
  },
}));
