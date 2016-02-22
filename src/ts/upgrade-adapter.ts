// Angular 2 Vendor Import
import {UpgradeAdapter} from 'angular2/upgrade';

// Instantiate the adapter singleton
export const upgradeAdapter = new UpgradeAdapter();

//
// Angular 2 Downgrades
//

// Marked
import {Marked} from './services/markdown'
upgradeAdapter.addProvider(Marked);

// Browser
import {LocalStorage} from './services/browser';
upgradeAdapter.addProvider(LocalStorage);

// menus
import {MdtMenuState} from './services/menu-services';
upgradeAdapter.addProvider(MdtMenuState);

// prompts
import {MdtPromptService} from './services/prompt-service';
upgradeAdapter.addProvider(MdtPromptService);

// sandbox
import {MdtSandboxState } from './services/sandbox-service';
upgradeAdapter.addProvider(MdtSandboxState);


//
// Angular 1 upgrades
//

// upgrade make listener
upgradeAdapter.upgradeNg1Provider('mdtMakeListener');
