// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. VARIABLE DECLARATIONS ---
    let mood = ""; // Stores the selected mood condition
    let lastSuggestionIndex = -1; // Stores the index of the last suggestion to avoid repeats

    // Object containing arrays of activity suggestions for each mood type
    const suggestions = {
        happy: [
            "Dance to music",
            "Go for a walk",
            "Start a gratitude journal",
            "Do something kind for someone",
            "Take cheerful photos outside",
            "Sing your favorite song out loud",
            "Start a creative hobby (painting, DIY, etc.)",
            "Plan a mini celebration",
            "Write down your happiest memories",
            "Play with a pet or go to a pet café"
        ],
        sad: [
            "Watch your favorite movie",
            "Call a friend",
            "Listen to calming music",
            "Write your feelings in a journal",
            "Take a warm bath or shower",
            "Read an inspiring story or book",
            "Go for a gentle nature walk",
            "Drink a hot cup of tea or cocoa",
            "Do something creative like drawing",
            "Spend time with a loved one or pet"
        ],
        stressed: [
            "Try 5-minute meditation",
            "Take deep breaths",
            "Stretch your body",
            "Unplug from screens for 30 minutes",
            "Listen to nature sounds or white noise",
            "Write a to-do list to clear your mind",
            "Do some light yoga or tai chi",
            "Color in a coloring book or mandala",
            "Spend time in a quiet space",
            "Take a short nap or rest your eyes"
        ],
        energetic: [
            "Go for a run",
            "Try a new recipe",
            "Organize your room",
            "Dance to your favorite playlist",
            "Start a DIY project",
            "Clean or redecorate a part of your house",
            "Challenge yourself with a new skill",
            "Do a workout challenge",
            "Plan a spontaneous outing",
            "Join a local event or group activity"
        ]
    };

    // DOM Element References
    const moodSelect = document.getElementById('mood-select');
    const showSuggestionBtn = document.getElementById('show-suggestion-btn');
    const suggestionContainer = document.getElementById('suggestion-container');
    const suggestionText = document.getElementById('suggestion-text');
    const newSuggestionBtn = document.getElementById('new-suggestion-btn');

    // Modal Elements
    const errorModal = document.getElementById('error-modal');
    const modalContent = document.getElementById('modal-content');
    const errorMessage = document.getElementById('error-message');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // --- 2. CORE LOGIC FUNCTIONS ---

    /**
     * Gets a random suggestion for the selected mood, avoiding the last shown one.
     */
    function displaySuggestion() {
        const suggestionList = suggestions[mood];

        // If there's only one suggestion, no need for complex random logic
        if (suggestionList.length === 1) {
            suggestionText.textContent = suggestionList[0];
            lastSuggestionIndex = 0;
            return;
        }

        let newIndex;
        // Keep picking a new random index until it's different from the last one
        do {
            newIndex = Math.floor(Math.random() * suggestionList.length);
        } while (newIndex === lastSuggestionIndex);

        lastSuggestionIndex = newIndex; // Update the last index
        suggestionText.textContent = suggestionList[newIndex];

        // Show the suggestion container with an animation
        suggestionContainer.classList.remove('hidden');
        suggestionContainer.classList.add('fade-in');
    }

    /**
     * Displays the custom error modal with a specific message.
     * @param {string} message The error message to display.
     */
    function showErrorModal(message) {
        errorMessage.textContent = message;
        errorModal.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95', 'opacity-0');
    }

    /**
     * Hides the custom error modal.
     */
    function hideErrorModal() {
        errorModal.classList.add('opacity-0');
        modalContent.classList.add('scale-95', 'opacity-0');
        // Wait for transition to finish before disabling pointer events
        setTimeout(() => {
            errorModal.classList.add('pointer-events-none');
        }, 300);
    }


    // --- 3. EVENT LISTENERS ---

    /**
     * Handles the click on the "Show Suggestion" button.
     * Corresponds to: Start -> User selects mood -> Click "Show Suggestion" button
     */
    showSuggestionBtn.addEventListener('click', () => {
        const selectedMood = moodSelect.value;

        // Flowchart Logic: IF mood is not selected -> show error
        if (!selectedMood) {
            showErrorModal("Please select a mood type before getting a suggestion.");
            return;
        }

        // Flowchart Logic: ELSE -> display random suggestion from list
        mood = selectedMood; // Store the current mood
        lastSuggestionIndex = -1; // Reset index for the new mood type
        displaySuggestion();

        showSuggestionBtn.classList.add('hidden');
    });

    // Hide the suggestion box when the mood changes
    moodSelect.addEventListener('change', () => {
        suggestionContainer.classList.add('hidden');
        suggestionContainer.classList.remove('fade-in');

        // Show the "Show Suggestion" button again
        showSuggestionBtn.classList.remove('hidden');
    });

    /**
     * Handles the click on the "New Suggestion" button.
     * Corresponds to: Click "New Suggestion" button -> Pick a different random suggestion
     */
    newSuggestionBtn.addEventListener('click', () => {
        // Remove animation class to allow it to be re-added
        suggestionContainer.classList.remove('fade-in');

        // Use a short timeout to ensure the class is removed before re-adding.
        // This creates a subtle flash effect on the text update.
        setTimeout(displaySuggestion, 50);
    });

    // Event listeners for closing the modal
    closeModalBtn.addEventListener('click', hideErrorModal);
    errorModal.addEventListener('click', (event) => {
        // Close only if the overlay (background) is clicked
        if (event.target === errorModal) {
            hideErrorModal();
        }
    });

});