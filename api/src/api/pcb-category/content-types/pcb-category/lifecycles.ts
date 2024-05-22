export default {
  async beforeCreate(event) {
    const { title, locale } = event.params.data;

    if (title && locale === 'en') {
      event.params.data.slug = title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
  },

  async beforeUpdate(event) {
    const { title } = event.params.data;
    const existingEntity: any = await strapi.entityService.findOne('api::pcb-category.pcb-category', event.params.where.id, {
      fields: ['locale']
    });

    if (title && existingEntity.locale && existingEntity.locale === 'en') {
      event.params.data.slug = title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
    }
  }
}