/**
 * contextual-risk controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contextual-risk.contextual-risk', () => ({
  async generateSlugs(ctx) {
    try {
      const contextualRisks = await strapi.db.query('api::contextual-risk.contextual-risk').findMany({
        where: { locale: 'en' }
      });

      for (const risk of contextualRisks) {
        if (risk.title) {
          const slug = risk.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
          await strapi.db.query('api::contextual-risk.contextual-risk').update({
            where: { id: risk.id },
            data: { slug },
          });
        }
      }
      ctx.send('Slugs for contextual risks generated successfully');
    } catch (error) {
      ctx.throw(500, 'An error occurred while generating slugs');
    }
  },
}));
