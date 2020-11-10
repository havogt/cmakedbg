'use strict';

import * as vscode from 'vscode';
import { ProviderResult} from 'vscode';

/*
 * The compile time flag 'runMode' controls how the debug adapter is run.
 * Please note: the test suite only supports 'external' mode.
 */
// const runMode: 'external' | 'server' | 'inline' = 'external';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('extension.mock-debug.getProgramName', config => {
		return vscode.window.showInputBox({
			placeHolder: "Please enter the name of a markdown file in the workspace folder",
			value: "readme.md"
		});
	}));

	// register a configuration provider for 'mock' debug type
	// const provider = new MockConfigurationProvider();
	// context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('mock', provider));

	// debug adapters can be run in different ways by using a vscode.DebugAdapterDescriptorFactory:
	let factory: vscode.DebugAdapterDescriptorFactory;
	// switch (runMode) {
	// 	case 'server':
	// 		// run the debug adapter as a server inside the extension and communicating via a socket
	// 		factory = new MockDebugAdapterDescriptorFactory();
	// 		break;

	// 	case 'inline':
	// 		// run the debug adapter inside the extension and directly talk to it
	// 		factory = new InlineDebugAdapterFactory();
	// 		break;

	// 	case 'external': default:
			// run the debug adapter as a separate process
			factory = new DebugAdapterExecutableFactory();
		// 	break;
		// }

	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('cmake', factory));
	if ('dispose' in factory) {
		context.subscriptions.push(factory);
	}
}

export function deactivate() {
	// nothing to do
}

class DebugAdapterExecutableFactory implements vscode.DebugAdapterDescriptorFactory {

	// The following use of a DebugAdapter factory shows how to control what debug adapter executable is used.
	// Since the code implements the default behavior, it is absolutely not neccessary and we show it here only for educational purpose.

	createDebugAdapterDescriptor(_session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): ProviderResult<vscode.DebugAdapterDescriptor> {
		// param "executable" contains the executable optionally specified in the package.json (if any)

        // use the executable specified in the package.json if it exists or determine it based on some other information (e.g. the session)
        
        
        const command = "/home/vogtha/git/cmake/build/code/bin/cmake";
        // const args = _session.configuration.args;
        const args = [ "--dap"].concat( _session.configuration.args).concat([
            "-B", _session.configuration.buildDirectory, "-S" , _session.configuration.sourceDirectory,
        ]);
        const options = {
            // cwd: "working directory for executable",
            // env: { "VAR": "some value" }
        };
        executable = new vscode.DebugAdapterExecutable(command, args, options);

		// make VS Code launch the DA executable
		return executable;
	}
}
