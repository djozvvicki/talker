export default defineNuxtRouteMiddleware(async (to) => {
  logger.info(`Route change to: ${to.path}`);
});
