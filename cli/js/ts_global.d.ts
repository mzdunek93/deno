// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This scopes the `ts` namespace globally, which is where it exists at runtime
// when building Deno, but the `typescript/lib/typescript.d.ts` is defined as a
// module.

// Warning! This is a magical import. We don't want to have multiple copies of
// typescript.d.ts around the repo, there's already one in
// deno_typescript/typescript/lib/typescript.d.ts. Ideally we could simply point
// to that in this import specifier, but "cargo package" is very strict and
// requires all files to be present in a crate's subtree.
// to get proper editor intellisense, you can substitute "$asset$" with
// "../../deno_typescript/typescript/lib" - remember to revert before committing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as ts_ from "../../deno_typescript/typescript/lib/typescript.d.ts";

declare global {
  namespace ts {
    export = ts_;

    export function pathIsAbsolute(path: string): boolean;
    export function resolvePath(
      path: string,
      ...paths: Array<string | undefined>
    ): string;
    export function getDirectoryPath(path: string): string;
    export function getRelativePathFromDirectory(
      from: string,
      to: string,
      ignoreCase: boolean
    ): string;

    export function generateDjb2Hash(data: string): string;

    export interface IncrementalCompilationOptions {
      rootNames: readonly string[];
      options: ts.CompilerOptions;
      configFileParsingDiagnostics?: readonly ts.Diagnostic[];
      projectReferences?: readonly ts.ProjectReference[];
      host?: ts.CompilerHost;
      reportDiagnostic?: ts.DiagnosticReporter;
      reportErrorSummary?: ts.ReportEmitErrorSummary;
      afterProgramEmitAndDiagnostics?(
        program: ts.EmitAndSemanticDiagnosticsBuilderProgram
      ): void;
      system?: ts.System;
    }
    export function performIncrementalCompilation(
      input: ts.IncrementalCompilationOptions
    ):
      | ts.ExitStatus.Success
      // eslint-disable-next-line @typescript-eslint/camelcase
      | ts.ExitStatus.DiagnosticsPresent_OutputsSkipped
      // eslint-disable-next-line @typescript-eslint/camelcase
      | ts.ExitStatus.DiagnosticsPresent_OutputsGenerated;
  }

  namespace ts {
    // this are marked @internal in TypeScript, but we need to access them,
    // there is a risk these could change in future versions of TypeScript
    export const libs: string[];
    export const libMap: Map<string, string>;
  }
}
