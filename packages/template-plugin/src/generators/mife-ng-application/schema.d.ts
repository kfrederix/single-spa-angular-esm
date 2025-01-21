import { E2eTestRunner, UnitTestRunner } from "@nx/angular/generators";
import { Styles } from "node_modules/@nx/angular/src/generators/utils/types";
import type { Linter, LinterType } from '@nx/eslint';

export interface MifeNgApplicationGeneratorSchema {
  name: string;
  directory: string;
  port: number;
  style?: Styles
  skipTests?: boolean
  unitTestRunner?: UnitTestRunner
  e2eTestRunner?: E2eTestRunner
  tags?: string;
  linter?: Linter | LinterType;
  addTailwind?: boolean
}
