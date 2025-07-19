// The example settings
export interface BranFlakesSettings {
	maxNumberOfProblems: number;
}


// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
export const defaultSettings: BranFlakesSettings = {
	maxNumberOfProblems: 5
};


export class SettingsManager {
	hasConfigurationCapability: boolean = false;
	hasWorkspaceFolderCapability: boolean = false;
	hasDiagnosticRelatedInformationCapability: boolean = false;

	documentSettings: Map<string, Thenable<BranFlakesSettings>> = new Map();

	#settings = defaultSettings;

	updateSettings(newSettings: BranFlakesSettings) {
		this.#settings = newSettings;
	}

	closeDocument(doc: string) {
		this.documentSettings.delete(doc);

	}
	clearDocumentSettings(){
		this.documentSettings.clear();
	}
}