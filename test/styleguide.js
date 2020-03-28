import logger from '../index';

(async function styleguide() {
  await logger.printBanner('The  Banner  title  here');
  await logger.printLogo();
  logger.makeSpace();

  logger.message("This is an 'h2' \nBelow are several other text styles:", 'h2');
  logger.message("This is a default message style.");
  logger.message("Longer messages should wrap lines. See? Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.");
  logger.message("A 3rd level heading...", 'h3');
  logger.message("Pseudo list items:");
  logger.message("thing 1", 'bullet');
  logger.message("thing 2", 'bullet');
  logger.message("thing 3", 'bullet');
  logger.message("TODO: May want to eventually support other headings too...")
  logger.makeSpace()

  logger.message("These are the status text styles:", 'h2');
  logger.status("This is the default status message");
  logger.status("another status message");
  logger.status("They really blend in to the background...");
  logger.status("things are working: Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur.");
  logger.warning("This is a warning message message");
  logger.warning("Followed by another warning.");
  logger.error("This is an error message!");

  const { response } = await logger.prompt('Finally, a prompt... (answer anything)');
  logger.status('Prompt completed. You answered:');
  logger.status(response);

  const { response: response2 } = await logger.prompt('Great, one more time (to be sure we\'re not clobbering multiple prompts... (answer anything)');
  logger.status('Prompt completed. You answered:');
  logger.status(response2);

})();