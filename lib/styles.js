import chalk from 'chalk';
// import chalk from 'ascii-art/kaolin';
import color from 'ascii-art-ansi/color';
import ascii from 'ascii-art';
import font from 'ascii-art-font';
import { LOG_LEVEL } from './logLevel';
import { logger } from './Logger';

font.fontPath = `${__dirname}/fonts/`;
color.is256 = false;
color.isTrueColor = false;

const ORG_PREFIX = 'A tool by';
const ORG_NAME = 'Reese Creative';
const ORG_WEBSITE = 'https://github.com/darkcody';

const COLOR_RC_RED = '#4e140a';

const LOGGER_STYLES = {
  _emphasis: chalk.bgHex('#212028').white,
  _emphasis_less: chalk.bgHex('#151015').white,
  [`_status_${LOG_LEVEL.info}`]: chalk.hex('#344148'),
  [`_status_${LOG_LEVEL.warning}`]: chalk.bgHex('#403505').white,
  [`_status_${LOG_LEVEL.error}`]: chalk.bgHex('#852210').white,
  primary: chalk.bold.cyan,
  rc_logo: chalk.red,
  rc: chalk.hex('#4e140a'),
  // rc: chalk.rgb(78,20,10),
  reset: chalk.reset,
};

export async function get_rc_logo() {
  const logo_text = ORG_NAME;
  let logo_font = 'rusted';
  const cols = process.stdout.columns;
  try {
    if (!cols || cols < 75 ) {
      // Too small for the logo, just print text.
      throw new Error();
    }
    const col1_cols = 20;
    const col2_cols = cols - col1_cols - 10;
    const logo = await ascii.image({
      filepath: `${__dirname}/images/logo.png`,
      width: 15,
      height: 25,
      // alphabet: 'variant2',
      alphabet: 'greyscale',
    });
    const text = await ascii.font(logo_text, logo_font);
    return logger.formatColumns([
      {content: logo, width: col1_cols, style: 'rc_logo' },
      {content: `\n\n\n${ORG_PREFIX}\n\n${text}\n${ORG_WEBSITE}`, width: col2_cols }
    ]);
  }
  catch (err) {
    // Something went wrong... just the basics.
    const FORMATTED_NAME = logger.formatMessage(ORG_NAME);
    const FORMATTED_PREFIX = logger.formatMessage(ORG_PREFIX);
    const FORMATTED_WEBSITE = logger.formatMessage(ORG_WEBSITE);
    return `${FORMATTED_PREFIX}\n${FORMATTED_NAME}\n\n${FORMATTED_WEBSITE}\n`;
  }
}

export default LOGGER_STYLES;