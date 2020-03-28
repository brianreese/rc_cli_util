import chalk from 'chalk';
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
const LOGO_FONT = 'rusted';
const BANNER_FONT = 'doom';
// An extremely rough (and conservative) estimate of stdout characters used
// per letter for the banner font. Should account for spaces too.
const char_per_letter = 7;

export const colors = {
  rc_red: '#4e140a',
  muted: '#323a45',
  muted_more: '#1a1e27',
  error: '#aa1113',
  warning: '#f0862c',
  success: '#53CA27',
  emphasis: '#5591af',
  emphasis_more: '#6ac4e5',
}

const LOGGER_STYLES = {
  _emphasis: chalk.bgHex(colors.muted).white,
  _emphasis_less: chalk.bgHex(colors.muted_more).hex(colors.emphasis),
  muted: chalk.hex(colors.muted),
  [`_status_${LOG_LEVEL.info}`]: chalk.hex(colors.muted),
  [`_status_${LOG_LEVEL.success}`]: chalk.bold.hex(colors.success),
  [`_status_${LOG_LEVEL.warning}`]: chalk.bgHex(colors.muted_more).hex(colors.warning),
  [`_status_${LOG_LEVEL.error}`]: chalk.bgHex(colors.error).white,
  primary: chalk.bold.hex(colors.emphasis_more),
  rc_logo: chalk.red,
  rc: chalk.hex(colors.rc_red),
  reset: chalk.reset,
};

export async function get_rc_logo() {
  const logo_text = ORG_NAME;
  try {
    const cols = getColsAndAssert();
    const col1_cols = 20;
    const col2_cols = cols - col1_cols - 10;
    const logo = await ascii.image({
      filepath: `${__dirname}/images/logo.png`,
      width: 15,
      height: 25,
      // alphabet: 'variant2',
      alphabet: 'greyscale',
    });
    const text = await ascii.font(logo_text, LOGO_FONT);
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

export async function get_sweet_banner(title) {
  let words = title.trim().split(' ').map(w => w + ' ');
  let lines=[''], cur_line=0, cur_len=0;
  try {
    const cols = Math.min(getColsAndAssert(), logger.getOpts()['width']);
    while (words.length) {
      let cur_word = words.shift();
      let cur_word_length = cur_word.length * char_per_letter;
      cur_len += cur_word_length;
      if (cur_word.match(/^\n/)) {
        cur_word = cur_word.replace(/^\n/, '');
        lines[++cur_line] = cur_word;
        cur_len = cur_word_length;
      }
      else if (cols > cur_len) {
        lines[cur_line] += cur_word;
      }
      else {
        lines[++cur_line] = cur_word;
        cur_len = cur_word_length;
      }
    }
    lines = lines.filter(l => l.length);
    lines = await Promise.all(lines.filter(l => l.length).map(async (line) => await ascii.font(line, BANNER_FONT)));
    return lines.join('\n');
  } catch (err) {
    return title;
  }
}

function getColsAndAssert() {
  const cols = process.stdout.columns;
  if (!cols || cols < 75 ) {
    // Too small for the logo, just print text.
    throw new Error();
  }
  return cols;
}

export default LOGGER_STYLES;