// Define the URL endpoint for OpenAI's API
var POST_URL = "https://api.openai.com/v1/chat/completions";

// Define the API key for OpenAI (replace with your own API key)
var YOUR_API_KEY = "USE_YOUR_OPENAI_API_KEY_HERE";

// Attempt to add a style to the webpage to help identify which areas are available to the extension
try {
	// Create a <style> element
	const dynamicStyle = document.createElement('style');
	
	// Define the style rules to add a dashed border around textareas, text inputs, and contenteditable areas
	dynamicStyle.textContent = `
	textarea, input[type="text"], [contenteditable="true"] {
		border: 1px dashed rgba(210,106,110,1.0) !important;
	  }
	`;
	
	// Append the created <style> element to the document's head
	document.head.appendChild(dynamicStyle);
} catch (error) {
	// Log any errors that occur while attempting to add the style (e.g., if the variable is already declared or inaccessible)
	console.error(error);
}

// Add an event listener to the document's body for any input events
document.body.addEventListener('input', function(event) {
	
	// Check if the event's target is a textarea, text input, search input, or contenteditable area
	if (	event.target.tagName.toLowerCase() === 'textarea' || 
			event.target.type === 'text' ||
			event.target.type === 'search' ||
			event.target.isContentEditable ||
			event.target.getAttribute('contenteditable') === 'true'
		) {
		
		var text = "";

		// If the target element is contenteditable, retrieve its text content
		if (event.target.isContentEditable || event.target.getAttribute('contenteditable') === 'true') {
			text = String(event.target.textContent);
		} else {
			// Otherwise, retrieve the value from the textarea or text input
			text = String(event.target.value);	
		}
		
		// Trim any whitespace from the text
		text = text.trim();
		
		// If the text is longer than 5 characters and starts with "/ai "
		if (text.length > 5){
			if (text.startsWith("/ai ")){
				// Log the text and target element for debugging
				onUpdate(text);
				onUpdate(event.target);
				
				// If the text ends with "//", start the process to get a response from OpenAI's API
				if (text.endsWith('\/\/')){
					
					// Update the target element's content to "Loading" while awaiting a response
					replaceContent(event.target, "Loading");			
					
					// Extract the actual prompt for the AI from the text
					my_prompt = text.substring(4, text.length - 2);
					
					// Set up an XMLHttpRequest to the OpenAI API
					const xhr = new XMLHttpRequest();
					xhr.open("POST", POST_URL);
					xhr.setRequestHeader("Authorization", "Bearer " + YOUR_API_KEY);
					xhr.setRequestHeader("Content-Type", "application/json");
					const body = {
						model: "gpt-3.5-turbo",
						messages: [{"role": "user", "content": my_prompt}],
						temperature: 0.7,
					};

					// Log the body of the request for debugging
					console.log(JSON.stringify(body));

					// Send the request to the API
					xhr.send(JSON.stringify(body));
					xhr.onload = function() {
						// Log the status code of the response
						onUpdate(xhr.status);
						
						// If the response was successful (status code 200)
  						if (xhr.status === 200) {
							// Log the full response for debugging
							console.log(xhr.responseText);
							
							// Parse the response and extract the AI's message
    						const response = JSON.parse(xhr.responseText);
							var responseText = response.choices[0]['message']['content'];
    						
							// Log the AI's message and update the target element's content with the AI's response
							onUpdate(responseText);
							replaceContent(event.target, responseText);
  						}
					};
				}
			}
		}
    }
});

// Define a function to replace the content of an element with new content
function replaceContent(element, newContent) {

    // If the element is contenteditable, replace its inner HTML
    if (element.contentEditable === 'true') {
        element.innerHTML = newContent;
    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // If the element is an input or textarea, replace its value
        element.value = newContent;
    } else {
        // For any other element types, log an unsupported element type message
        onUpdate("Unsupported element type");
		onUpdate("element: " + element);
    }
	// Force a reflow to ensure any changes are rendered immediately.
	// Most notably, required to use within writing Twitter/X messages,
	// otherwise, only the prompt is sent as a tweet.
	element.style.display = 'none';
	void element.offsetWidth;
	element.style.display = '';		
}

// Define a boolean to determine if debugging logs should be shown
var show_debug = true;

// Define a function to log errors if debugging is enabled
function onError(error) {
    if (show_debug){
      console.log(error);
    }
}

// Define a function to log updates if debugging is enabled
function onUpdate(update){
  	if (show_debug){
      console.log(update);
    }
}
