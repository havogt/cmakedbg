'use strict';

import * as vscode from 'vscode';
import { ProviderResult} from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let factory = new DebugAdapterExecutableFactory();

	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('cmake', factory));
	if ('dispose' in factory) {
		context.subscriptions.push(factory);
	}
}

export function deactivate() {
	// nothing to do
}

class DebugAdapterExecutableFactory implements vscode.DebugAdapterDescriptorFactory {
	createDebugAdapterDescriptor(_session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): ProviderResult<vscode.DebugAdapterDescriptor> {
		// param "executable" contains the executable optionally specified in the package.json (if any)

        // use the executable specified in the package.json if it exists or determine it based on some other information (e.g. the session)
        
        
        const command = "/home/vogtha/git/cmake/build/code/bin/cmake";
        const args = [ "--dap"].concat( _session.configuration.args).concat([
            "-B", _session.configuration.buildDirectory, "-S" , _session.configuration.sourceDirectory,
        ]);
        const options = {
            // cwd: "working directory for executable",
            // env: { "VAR": "some value" }
        };
        executable = new vscode.DebugAdapterExecutable(command, args, options);
		return executable;
	}
}
