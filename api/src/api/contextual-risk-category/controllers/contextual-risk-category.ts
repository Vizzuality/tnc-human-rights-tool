/**
 * contextual-risk-category controller
 */

import { factories } from '@strapi/strapi'
import slugify from 'slugify';

export default factories.createCoreController('api::contextual-risk-category.contextual-risk-category', () => ({
  async generateSlugs(ctx) {
    try {
      const riskCategories = await strapi.db.query('api::contextual-risk-category.contextual-risk-category').findMany({
        where: { locale: 'en' }
      });

      for (const category of riskCategories) {
        if (category.title) {
          const slug = slugify(category.title, { lower: true, strict: true, trim: true });

          // Update the category with the new slug
          await strapi.db.query('api::contextual-risk-category.contextual-risk-category').update({
            where: { id: category.id },
            data: { slug },
          });
        }
      }
      ctx.body = 'Slugs for contextual risks categories generated successfully';
    } catch (error) {
      ctx.throw(500, 'An error occurred while generating slugs');
    }
  },
}));
