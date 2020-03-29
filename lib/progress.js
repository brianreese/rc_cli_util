import cliProgress from 'cli-progress';
import { colors } from  './styles';
import chalk from 'chalk';

export class ProgressBar {
  constructor(total=100) {
    this.total = total;
    this.bar = new cliProgress.SingleBar({
      format: this._getBarFormat(),
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });
  }

  _getBarFormat() {
    return chalk.hex(colors.muted)('{bar}') + ' | {percentage}%';
  }

  start() {
    this.bar.start(this.total);
  }

  increment() {
    this.bar.increment();
  }

  update(progress) {
    this.bar.update(progress);
  }

  stop() {
    this.bar.stop();
  }
}

export class ProgressBarCount extends ProgressBar {
  _getBarFormat() {
    return chalk.hex(colors.muted)('{bar}') + ' | {percentage}% ({value}/{total} total)';
  }
}