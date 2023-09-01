## AiAux

### Plug In To Enable Generative AI in Existing Webapps

This repo contains the open source version of AiAux -- a Chrome Extension that will allow you to query generative AI in existing/legacy web apps, without leaving the page.  Once installed, the extension will let you type <code>/ai your prompt here //</code>, where "your prompt here" is used to query the AI to generate a response -- for example, you could use it within Gmail, and enter something like <code>/ai write me a brief email in a helpful and friendly tone asking about next steps in my internship application // </code>.

## How To Install

 * <a href="https://github.com/kaiuechi/AiAux/archive/refs/heads/main.zip">Download</a> this repo
 * Unzip what you downloaded
 * Open the file `aiaux/content.js` in your text editor, and add your own Open AI API key as the value for the variable `YOUR_API_KEY`
 * Open the extension page in Google Chrome -- in the URL/address bar, go to <code>chrome://extensions</code>
 * Activate developer mode (upper right) with the slider-switch. Then click the "Load unpacked" button (upper left).
 * Navigate into the folder where you unzipped the file (above), and into the `AiAux/aiaux` folder that includes files like `manifest.json`.  Select that directory, and Chrome will install the extension.
 * Make sure the extension is enabled by the slider-switch is in the "on" position, and you should see the extension icon (3 circles) appear in your Chrome toolbar.


## Code Explainer

### background.js

This code listens for updates to any Chrome tab. When a tab finishes loading <code>changeInfo.status === 'complete'</code> and its URL starts with <code>http</code>, it injects `content.js` into the tab. If the script is successfully injected, a message "AiAux added foreground script" is logged. If there's an error during the injection, the error is logged to the console.

### content.js

This code defines a Chrome extension that will add a dashed border around any textareas, text inputs, and contenteditable areas on a webpage. When the user types within any of these areas, if the text starts with <code>/ai </code> and ends with <code>//</code>, the extension will send the text (excluding the <code>/ai </code> prefix and <code>//</code> suffix) to OpenAI's API and replace the content of the element with the AI's response.

Set your API key for OpenAI as the value of <code>YOUR_API_KEY</code> in `content.js` at the line:
`var YOUR_API_KEY = "USE_YOUR_OPENAI_API_KEY_HERE";`


## More Information

I'm also building out this extension -- getting it into the Chrome Web Store, and offering it as a service for people looking to target specific use-cases, and those who might not want to fuss with the code at all.  You can check that out a <a href="https://www.aiaux.app">aiaux.app</a>.  The extension available there is basically the same, but it includes user authentication and uses an API between the page and the AI engine, to enable additional logging and safeguards.

