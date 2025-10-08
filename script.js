// User data and earnings tracking
let userData = {
    username: "User",
    email: "",
    balance: 0.00,
    completedCourses: 0,
    totalEarnings: 0.00,
    isLoggedIn: false,
    lastLanguage: null,
    quizAnswers: {},
    certificates: {},
    courseProgress: {}
};

// Current language and quiz tracking
let currentLanguage = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let userScore = 0;
let currentCourse = null;

// Timer variables
let countdownTimer;
let timeLeft = 120;

// Track unlocked exercises
let unlockedExercises = JSON.parse(localStorage.getItem('unlockedExercises')) || {};

// Course data with external links
const courses = {
    html: [
        {
            title: "HTML COURSE",
            description: "Learn the basics of HTML structure and elements",
            lessons: 12,
            earnings: 0.15,
            externalLink: "Html001.html"
        },
    ],
    css: [
        {
            title: "CSS COURSE",
            description: "Learn CSS selectors, properties and values",
            lessons: 10,
            earnings: 0.15,
            externalLink: "3css.html"
        },
    ],
    javascript: [
        {
            title: "JAVASCRIPT COURSE",
            description: "Learn variables, functions, and control flow",
            lessons: 12,
            earnings: 0.15,
            externalLink: "page1.html"
        },
    ],
    python: [
        {
            title: "Python COURSE",
            description: "Learn Python syntax and basic programming concepts",
            lessons: 14,
            earnings: 0.15,
            externalLink: "Pylearn.html"
        },
    ],
    java: [
        {
            title: "JAVA COURSE",
            description: "Learn Java syntax and object-oriented programming basics",
            lessons: 16,
            earnings: 0.15,
            externalLink: "https://example.com/java-course"
        },
    ],
    cpp: [
        {
            title: "C++ COURSE",
            description: "Learn C++ syntax and basic programming concepts",
            lessons: 14,
            earnings: 0.15,
            externalLink: "https://example.com/cpp-course"
        },
    ]
};

// Quiz data
const quizzes = {
    html: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Tech Modern Language",
                "Hyper Transfer Markup Language",
                "Home Tool Markup Language"
            ],
            correct: 0
        },
        {
            question: "Which tag is used for creating a hyperlink?",
            options: [
                "<link>",
                "<a>",
                "<href>",
                "<hyperlink>"
            ],
            correct: 1
        }
    ],
    css: [
        {
            question: "What does CSS stand for?",
            options: [
                "Computer Style Sheets",
                "Creative Style System",
                "Cascading Style Sheets",
                "Colorful Style Sheets"
            ],
            correct: 2
        },
        {
            question: "Which property is used to change the background color?",
            options: [
                "color",
                "bgcolor",
                "background-color",
                "background"
            ],
            correct: 2
        }
    ],
    javascript: [
        {
            question: "Which of the following is a JavaScript data type?",
            options: [
                "style",
                "boolean",
                "div",
                "class"
            ],
            correct: 1
        },
        {
            question: "How do you create a function in JavaScript?",
            options: [
                "function = myFunction()",
                "function myFunction()",
                "function:myFunction()",
                "create myFunction()"
            ],
            correct: 1
        }
    ],
    python: [
        {
            question: "Which of the following is the correct extension for Python files?",
            options: [
                ".pyt",
                ".pt",
                ".py",
                ".python"
            ],
            correct: 2
        },
        {
            question: "How do you create a variable with the numeric value 5 in Python?",
            options: [
                "x = int(5)",
                "x = 5",
                "int x = 5",
                "Both 1 and 2"
            ],
            correct: 3
        }
    ],
    java: [
        {
            question: "Which of the following is not a Java keyword?",
            options: [
                "class",
                "interface",
                "object",
                "extends"
            ],
            correct: 2
        },
        {
            question: "What is the default value of a boolean variable in Java?",
            options: [
                "true",
                "false",
                "null",
                "0"
            ],
            correct: 1
        }
    ],
    cpp: [
        {
            question: "Which of the following is the correct syntax to output 'Hello World' in C++?",
            options: [
                "System.out.println('Hello World');",
                "cout << 'Hello World';",
                "print('Hello World');",
                "Console.WriteLine('Hello World');"
            ],
            correct: 1
        },
        {
            question: "Which operator is used to allocate memory in C++?",
            options: [
                "new",
                "malloc",
                "create",
                "allocate"
            ],
            correct: 0
        }
    ]
};

// Exercise data with external links
const exercises = {
    html: {
        title: "HTML Exercises",
        description: "Practice your HTML skills with these exercises",
        externalLink: "Hq1.html"
    },
    css: {
        title: "CSS Exercises",
        description: "Practice your CSS skills with these exercises",
        externalLink: "cccccc.html"
    },
    javascript: {
        title: "JavaScript Exercises",
        description: "Practice your JavaScript skills with these exercises",
        externalLink: "xxx.html"
    },
    python: {
        title: "Python Exercises",
        description: "Practice your Python skills with these exercises",
        externalLink: "https://example.com/python-exercises"
    },
    java: {
        title: "Java Exercises",
        description: "Practice your Java skills with these exercises",
        externalLink: "https://example.com/java-exercises"
    },
    cpp: {
        title: "C++ Exercises",
        description: "Practice your C++ skills with these exercises",
        externalLink: "https://example.com/cpp-exercises"
    }
};

// Project data
const projects = {
    html: [
        {
            title: "Personal Portfolio Website",
            description: "Build your own professional portfolio website using HTML, CSS, and JavaScript.",
            difficulty: "Beginner",
            earnings: 0.25
        }
    ],
    css: [
        {
            title: "CSS Grid Layout Gallery",
            description: "Design an image gallery using CSS Grid with responsive layout.",
            difficulty: "Intermediate",
            earnings: 0.25
        }
    ],
    javascript: [
        {
            title: "Weather App",
            description: "Build a weather application that fetches data from a weather API.",
            difficulty: "Intermediate",
            earnings: 0.25
        }
    ],
    python: [
        {
            title: "Data Analysis Dashboard",
            description: "Build a dashboard for data analysis using Python and visualization libraries.",
            difficulty: "Advanced",
            earnings: 0.25
        }
    ],
    java: [
        {
            title: "Inventory Management System",
            description: "Develop an inventory management system with Java and MySQL.",
            difficulty: "Advanced",
            earnings: 0.25
        }
    ],
    cpp: [
        {
            title: "Student Record System",
            description: "Create a console-based student record management system using C++.",
            difficulty: "Intermediate",
            earnings: 0.25
        }
    ]
};

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // Reset password reset form when closing
        if (modalId === 'forgotPasswordModal') {
            document.getElementById('resetEmail').value = '';
            document.getElementById('resetCodeGroup').style.display = 'none';
            document.getElementById('resetNewPasswordGroup').style.display = 'none';
            document.getElementById('resetConfirmPasswordGroup').style.display = 'none';
            document.getElementById('resetPasswordBtn').style.display = 'none';
            document.getElementById('resetCode').value = '';
            document.getElementById('resetNewPassword').value = '';
            document.getElementById('resetConfirmPassword').value = '';
            
            // Reset timer
            if (countdownTimer) {
                clearInterval(countdownTimer);
            }
            const resetTimer = document.getElementById('resetTimer');
            if (resetTimer) {
                resetTimer.style.display = 'none';
            }
            const sendResetCodeBtn = document.getElementById('sendResetCodeBtn');
            if (sendResetCodeBtn) {
                sendResetCodeBtn.disabled = false;
                sendResetCodeBtn.textContent = 'Send Reset Code';
            }
        }
        
        // Reset signup form timer when closing
        if (modalId === 'signupModal') {
            if (countdownTimer) {
                clearInterval(countdownTimer);
            }
            const signupTimer = document.getElementById('signupTimer');
            if (signupTimer) {
                signupTimer.style.display = 'none';
            }
            const sendSignupCodeBtn = document.getElementById('sendSignupCodeBtn');
            if (sendSignupCodeBtn) {
                sendSignupCodeBtn.disabled = false;
                sendSignupCodeBtn.textContent = 'Send Verification Code';
            }
        }
    }
    
    // Reset quiz state if closing quiz modal
    if (modalId === 'quizModal') {
        currentQuiz = null;
        currentQuestionIndex = 0;
        userScore = 0;
        currentCourse = null;
    }
}

// Initialize the page with user data
document.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('fravicoTechUser');
    if (savedUser) {
        userData = JSON.parse(savedUser);
    }
    updateUI();
    showAllCourses();
    
    // Add event listeners for navigation
    initializeNavigation();
    
    // Add event listener for withdrawal amount calculation
    const withdrawAmount = document.getElementById('withdrawAmount');
    if (withdrawAmount) {
        withdrawAmount.addEventListener('input', function() {
            const amount = parseFloat(this.value) || 0;
            const kesAmount = amount * 130;
            const afterFee = kesAmount * 0.95; // 5% transaction fee
            document.getElementById('withdrawKES').textContent = Math.round(afterFee);
        });
    }
    
    // Add event listener for donation amount calculation
    const donationAmount = document.getElementById('donationAmount');
    if (donationAmount) {
        donationAmount.addEventListener('input', function() {
            const amount = parseFloat(this.value) || 0;
            document.getElementById('donationKES').textContent = Math.round(amount * 130);
        });
    }
    
    // Initialize unlocked exercises
    const savedUnlocked = localStorage.getItem('unlockedExercises');
    if (savedUnlocked) {
        unlockedExercises = JSON.parse(savedUnlocked);
    }
    
    // Add event listeners for signup fields
    ['signupUsername','signupEmail','signupPassword','signupCode'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', checkSignupCode);
        }
    });

    // Add modal close event listeners
    initializeModalEvents();
});

// Initialize modal event listeners
function initializeModalEvents() {
    // Close buttons for all modals
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Login form event listeners
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginBtn = document.getElementById('loginBtn');

    if (loginEmail && loginPassword && loginBtn) {
        loginEmail.addEventListener('input', toggleLoginButton);
        loginPassword.addEventListener('input', toggleLoginButton);
        loginBtn.addEventListener('click', login);
    }

    // Signup form event listeners
    const signupSubmitBtn = document.getElementById('signupSubmitBtn');
    if (signupSubmitBtn) {
        signupSubmitBtn.addEventListener('click', signup);
    }

    // Send signup code button
    const sendSignupCodeBtn = document.getElementById('sendSignupCodeBtn');
    if (sendSignupCodeBtn) {
        sendSignupCodeBtn.addEventListener('click', sendSignupCode);
    }

    // Send reset code button
    const sendResetCodeBtn = document.getElementById('sendResetCodeBtn');
    if (sendResetCodeBtn) {
        sendResetCodeBtn.addEventListener('click', sendResetCode);
    }

    // Reset password button
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    if (resetPasswordBtn) {
        resetPasswordBtn.addEventListener('click', resetPassword);
    }

    // Forgot password button
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', showForgotPasswordModal);
    }

    // Switch to signup link
    const showSignupLink = document.getElementById('showSignupLink');
    if (showSignupLink) {
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSignup();
        });
    }

    // Switch to login link
    const showLoginLink = document.getElementById('showLoginLink');
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLogin();
        });
    }

    // Profile button in sidebar
    const profileBtn = document.getElementById('profileToggle');
    if (profileBtn) {
        profileBtn.addEventListener('click', toggleSidebar);
    }

    // Update profile button
    const updateProfileBtn = document.getElementById('updateProfileBtn');
    if (updateProfileBtn) {
        updateProfileBtn.addEventListener('click', updateProfile);
    }

    // Withdrawal button
    const withdrawBtn = document.getElementById('withdrawBtn');
    if (withdrawBtn) {
        withdrawBtn.addEventListener('click', processWithdrawal);
    }

    // Donation button
    const donateBtn = document.getElementById('donateBtn');
    if (donateBtn) {
        donateBtn.addEventListener('click', processDonation);
    }

    // Settings button
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', updateSettings);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // M-Pesa payment button
    const processMpesaBtn = document.getElementById('processMpesaBtn');
    if (processMpesaBtn) {
        processMpesaBtn.addEventListener('click', processMpesaPayment);
    }

    // Quiz continue button
    const continueQuizBtn = document.getElementById('continueQuizBtn');
    if (continueQuizBtn) {
        continueQuizBtn.addEventListener('click', function() {
            closeModal('quizModal');
        });
    }

    // Submit quiz button
    const submitQuizButton = document.getElementById('submitQuizButton');
    if (submitQuizButton) {
        submitQuizButton.addEventListener('click', submitQuiz);
    }

    // Sidebar overlay click to close sidebar
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Login from reset link
    const showLoginFromReset = document.getElementById('showLoginFromReset');
    if (showLoginFromReset) {
        showLoginFromReset.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal('forgotPasswordModal');
            showLoginModal();
        });
    }
}

// Initialize navigation event listeners
function initializeNavigation() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const action = this.getAttribute('data-tab');
            switch(action) {
                case 'home':
                    showHome();
                    break;
                case 'exercises':
                    showExercises();
                    break;
                case 'projects':
                    showProjects();
                    break;
                case 'certificates':
                    showCertificates();
                    break;
                case 'donation':
                    showDonation();
                    break;
            }
        });
    });
    
    // Language logos
    document.querySelectorAll('.language-logo').forEach(logo => {
        logo.addEventListener('click', function() {
            const language = this.getAttribute('data-language');
            showLanguageCourses(language);
        });
    });
    
    // Sidebar menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const contentId = this.getAttribute('data-content');
            showSidebarContent(contentId);
        });
    });
}

// Update UI with user data
function updateUI() {
    document.getElementById('username').textContent = userData.username;
    document.getElementById('userBalance').textContent = userData.balance.toFixed(2);
    document.getElementById('completedCourses').textContent = userData.completedCourses;
    document.getElementById('totalEarnings').textContent = userData.totalEarnings.toFixed(2);
    
    // Update sidebar
    document.getElementById('sidebarUsername').textContent = userData.username;
    document.getElementById('sidebarBalance').textContent = userData.balance.toFixed(2);
    
    const withdrawBalance = document.getElementById('withdrawBalance');
    const kesBalance = document.getElementById('kesBalance');
    
    if (withdrawBalance) {
        withdrawBalance.textContent = userData.balance.toFixed(2);
    }
    if (kesBalance) {
        kesBalance.textContent = Math.round(userData.balance * 130 * 0.95); // Including 5% fee
    }
    
    // Update profile form
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    
    if (profileUsername) {
        profileUsername.value = userData.username;
    }
    if (profileEmail) {
        profileEmail.value = userData.email;
    }
}

// Toggle sidebar
function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
}

// Close sidebar
function closeSidebar() {
    document.body.classList.remove('sidebar-open');
}

// Show sidebar content
function showSidebarContent(contentId) {
    // Hide all content sections
    document.querySelectorAll('.sidebar-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected content and activate menu item
    const contentElement = document.getElementById(contentId + 'Content');
    if (contentElement) {
        contentElement.classList.add('active');
    }
    event.currentTarget.classList.add('active');
}

// Update profile
function updateProfile() {
    const newUsername = document.getElementById('profileUsername').value;
    const newEmail = document.getElementById('profileEmail').value;
    
    if (newUsername) {
        userData.username = newUsername;
    }
    
    if (newEmail) {
        userData.email = newEmail;
    }
    
    localStorage.setItem('fravicoTechUser', JSON.stringify(userData));
    updateUI();
    alert('Profile updated successfully!');
}

// Process withdrawal
function processWithdrawal() {
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const mpesaNumber = document.getElementById('mpesaNumber').value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid withdrawal amount');
        return;
    }
    
    if (amount > userData.balance) {
        alert('Insufficient balance for this withdrawal');
        return;
    }
    
    if (!mpesaNumber || mpesaNumber.length !== 10 || !(mpesaNumber.startsWith('07') || mpesaNumber.startsWith('01'))) {
        alert('Please enter a valid M-Pesa number (10 digits starting with 07 or 01)');
        return;
    }
    
    // Process withdrawal with 5% fee
    const kesAmount = amount * 130;
    const transactionFee = kesAmount * 0.05;
    const finalAmount = kesAmount - transactionFee;
    
    userData.balance -= amount;
    localStorage.setItem('fravicoTechUser', JSON.stringify(userData));
    updateUI();
    
    alert(`Withdrawal successful! KES ${Math.round(finalAmount)} will be sent to ${mpesaNumber} within 24 hours. (5% transaction fee applied: KES ${Math.round(transactionFee)})`);
    
    // Reset form
    document.getElementById('withdrawAmount').value = '';
    document.getElementById('mpesaNumber').value = '';
    document.getElementById('withdrawKES').textContent = '0';
}

// Process donation
function processDonation() {
    const amount = parseFloat(document.getElementById('donationAmount').value);
    const mpesaNumber = document.getElementById('donationMpesa').value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid donation amount');
        return;
    }
    
    if (!mpesaNumber || mpesaNumber.length !== 10 || !(mpesaNumber.startsWith('07') || mpesaNumber.startsWith('01'))) {
        alert('Please enter a valid M-Pesa number (10 digits starting with 07 or 01)');
        return;
    }
    
    const kesAmount = Math.round(amount * 130);
    alert(`Thank you for your donation! You will receive a prompt on ${mpesaNumber} to confirm your donation of KES ${kesAmount}.`);
    
    // Reset form
    document.getElementById('donationAmount').value = '';
    document.getElementById('donationMpesa').value = '';
    document.getElementById('donationKES').textContent = '0';
    
    // Close modal
    closeModal('donationModal');
}

// Update settings
function updateSettings() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword && newPassword === confirmPassword) {
        alert('Password updated successfully!');
    } else if (newPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Save other settings
    const emailNotifications = document.getElementById('emailNotifications').checked;
    
    alert('Settings saved successfully!');
}

// Logout
function logout() {
    userData = {
        username: "User",
        email: "",
        balance: 0.00,
        completedCourses: 0,
        totalEarnings: 0.00,
        isLoggedIn: false,
        lastLanguage: null,
        quizAnswers: {},
        certificates: {},
        courseProgress: {}
    };
    
    localStorage.removeItem('fravicoTechUser');
    updateUI();
    closeSidebar();
    alert('Logged out successfully!');
}

// Function to open external link for a course - WITH LOGIN RESTRICTION
function openCourseLink(language, courseTitle) {
    if (!userData.isLoggedIn) {
        showLoginModal();
        return;
    }
    
    const course = courses[language].find(c => c.title === courseTitle);
    if (course && course.externalLink) {
        window.open(course.externalLink, '_blank');
    } else {
        startCourse(language, courseTitle);
    }
}

// Function to open external link for an exercise - WITH LOGIN RESTRICTION
function openExerciseLink(language) {
    if (!userData.isLoggedIn) {
        showLoginModal();
        return;
    }
    
    if (exercises[language] && exercises[language].externalLink) {
        window.open(exercises[language].externalLink, '_blank');
    } else {
        startQuiz(language);
    }
}

// Show all courses - WITH LOGIN RESTRICTION ON CLICKS
function showAllCourses() {
    const courseGrid = document.getElementById('contentGrid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = '';
    document.getElementById('contentTitle').textContent = 'Available Courses';
    
    for (const language in courses) {
        courses[language].forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.addEventListener('click', function() {
                if (!userData.isLoggedIn) {
                    showLoginModal();
                    return;
                }
                openCourseLink(language, course.title);
            });
            courseCard.innerHTML = `
                <div class="course-header ${language}-header">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                </div>
                <div class="course-content">
                    <p>Earn $${course.earnings.toFixed(2)} by completing this course!</p>
                    <div class="course-stats">
                        <div class="course-stat">
                            <h4>Lessons</h4>
                            <p>${course.lessons}</p>
                        </div>
                        <div class="course-stat">
                            <h4>Earnings</h4>
                            <p>$${course.earnings.toFixed(2)}</p>
                        </div>
                    </div>
                    ${userData.courseProgress[`${language}_${course.title}`] === 'completed' ? 
                        '<div class="certificate-status status-passed">COMPLETED</div>' :
                        '<div class="btn">View Course</div>'
                    }
                </div>
            `;
            courseGrid.appendChild(courseCard);
        });
    }
}

// Show courses for a specific language - WITH LOGIN RESTRICTION
function showLanguageCourses(language) {
    currentLanguage = language;
    userData.lastLanguage = language;
    localStorage.setItem('fravicoTechUser', JSON.stringify(userData));
    
    if (!userData.isLoggedIn) {
        showLoginModal();
        return;
    }
    
    const courseGrid = document.getElementById('contentGrid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = '';
    document.getElementById('contentTitle').textContent = `${language.toUpperCase()} Courses`;
    
    courses[language].forEach(course => {
        const isCompleted = userData.courseProgress[`${language}_${course.title}`] === 'completed';
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.addEventListener('click', function() {
            if (!userData.isLoggedIn) {
                showLoginModal();
                return;
            }
            openCourseLink(language, course.title);
        });
        courseCard.innerHTML = `
            <div class="course-header ${language}-header">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
            </div>
            <div class="course-content">
                <p>Earn $${course.earnings.toFixed(2)} by completing this course!</p>
                <div class="course-stats">
                    <div class="course-stat">
                        <h4>Lessons</h4>
                        <p>${course.lessons}</p>
                    </div>
                    <div class="course-stat">
                        <h4>Earnings</h4>
                        <p>$${course.earnings.toFixed(2)}</p>
                    </div>
                </div>
                ${isCompleted ? 
                    '<div class="certificate-status status-passed">COMPLETED</div>' :
                    '<div class="btn">View Course</div>'
                }
            </div>
        `;
        courseGrid.appendChild(courseCard);
    });
}

// Show projects for a specific language - WITH LOGIN RESTRICTION
function showProjectsForLanguage(language) {
    currentLanguage = language;
    const courseGrid = document.getElementById('contentGrid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = '';
    document.getElementById('contentTitle').textContent = `${language.toUpperCase()} Projects`;
    
    if (projects[language]) {
        projects[language].forEach(project => {
            const isCompleted = userData.courseProgress[`${language}_${project.title}`] === 'completed';
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.addEventListener('click', function() {
                if (!userData.isLoggedIn) {
                    showLoginModal();
                    return;
                }
                startProject(language, project.title);
            });
            projectCard.innerHTML = `
                <div class="project-header">
                    <h3>${project.title}</h3>
                </div>
                <div class="project-content">
                    <p>${project.description}</p>
                    <div class="project-stats">
                        <div class="project-stat">
                            <h4>Difficulty</h4>
                            <p>${project.difficulty}</p>
                        </div>
                        <div class="project-stat">
                            <h4>Earnings</h4>
                            <p>$${project.earnings.toFixed(2)}</p>
                        </div>
                    </div>
                    ${isCompleted ? 
                        '<div class="certificate-status status-passed">COMPLETED</div>' :
                        '<div class="btn">View Project</div>'
                    }
                </div>
            `;
            courseGrid.appendChild(projectCard);
        });
    }
}

// Show certificates
function showCertificates() {
    const courseGrid = document.getElementById('contentGrid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = '';
    document.getElementById('contentTitle').textContent = 'Your Certificates';
    
    // Calculate completion percentage
    let totalCourses = 0;
    let completedCourses = 0;
    
    for (const language in courses) {
        totalCourses += courses[language].length;
        courses[language].forEach(course => {
            if (userData.courseProgress[`${language}_${course.title}`] === 'completed') {
                completedCourses++;
            }
        });
    }
    
    for (const language in projects) {
        totalCourses += projects[language].length;
        projects[language].forEach(project => {
            if (userData.courseProgress[`${language}_${project.title}`] === 'completed') {
                completedCourses++;
            }
        });
    }
    
    const completionPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
    
    if (Object.keys(userData.certificates).length === 0) {
        courseGrid.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-certificate" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No certificates yet</h3>
                <p>Complete courses and projects to earn certificates!</p>
                <div class="certificate-progress">
                    <div class="certificate-progress-fill" style="width: ${completionPercentage}%"></div>
                </div>
                <p>Overall Completion: ${completionPercentage}%</p>
            </div>
        `;
        return;
    }
    
    // Show completion percentage
    courseGrid.innerHTML = `
        <div style="text-align: center; padding: 1rem; margin-bottom: 2rem; width: 100%;">
            <h3>Overall Progress</h3>
            <div class="certificate-progress">
                <div class="certificate-progress-fill" style="width: ${completionPercentage}%"></div>
            </div>
            <p>Completed: ${completedCourses}/${totalCourses} (${completionPercentage}%)</p>
        </div>
    `;
    
    for (const language in userData.certificates) {
        const certificate = userData.certificates[language];
        const percentage = (certificate.score / 5) * 100;
        const passed = percentage >= 80;
        
        const certificateCard = document.createElement('div');
        certificateCard.className = 'certificate-card';
        certificateCard.innerHTML = `
            <div class="certificate-header">
                <h3>${language.toUpperCase()} Proficiency</h3>
            </div>
            <div class="certificate-score">${percentage}%</div>
            <div class="certificate-progress">
                <div class="certificate-progress-fill" style="width: ${percentage}%"></div>
            </div>
            <div class="certificate-status ${passed ? 'status-passed' : 'status-failed'}">
                ${passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
            </div>
            <p>Score: ${certificate.score}/5</p>
            <p>Earned: $${certificate.earnings.toFixed(2)}</p>
            <p>Date: ${new Date(certificate.date).toLocaleDateString()}</p>
        `;
        courseGrid.appendChild(certificateCard);
    }
}

// Show projects page
function showProjects() {
    if (userData.lastLanguage) {
        showProjectsForLanguage(userData.lastLanguage);
    } else {
        // Default to HTML if no language selected yet
        showProjectsForLanguage('html');
    }
}

// Show home page
function showHome() {
    if (userData.lastLanguage) {
        showLanguageCourses(userData.lastLanguage);
    } else {
        showAllCourses();
    }
}

// Show exercises page with unlock buttons - WITH LOGIN RESTRICTION
function showExercises() {
    const courseGrid = document.getElementById('contentGrid');
    if (!courseGrid) return;
    
    courseGrid.innerHTML = '';
    document.getElementById('contentTitle').textContent = 'Language Exercises';
    
    // Show exercises for all languages
    for (const language in exercises) {
        const isUnlocked = unlockedExercises[language] || false;
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'course-card';
        
        const startButton = document.createElement('div');
        startButton.className = isUnlocked ? 'btn' : 'btn btn-locked';
        startButton.textContent = isUnlocked ? 'Start Exercise' : 'Unlock Exercise - 36 KES';
        startButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!userData.isLoggedIn) {
                showLoginModal();
                return;
            }
            if (isUnlocked) {
                openExerciseLink(language);
            } else {
                showMpesaModal(language);
            }
        });
        
        exerciseCard.innerHTML = `
            <div class="course-header ${language}-header">
                <h3>${exercises[language].title}</h3>
                <p>${exercises[language].description}</p>
            </div>
            <div class="course-content">
                <p>Take this quiz to test your knowledge of ${language.toUpperCase()} and earn $0.15!</p>
                <div class="course-stats">
                    <div class="course-stat">
                        <h4>Questions</h4>
                        <p>${quizzes[language].length}</p>
                    </div>
                    <div class="course-stat">
                        <h4>Earnings</h4>
                        <p>$0.15</p>
                    </div>
                </div>
            </div>
        `;
        exerciseCard.querySelector('.course-content').appendChild(startButton);
        courseGrid.appendChild(exerciseCard);
    }
}

// Show donation page
function showDonation() {
    document.getElementById('donationModal').style.display = 'flex';
}

// Start course - WITH LOGIN RESTRICTION
function startCourse(language, courseTitle) {
    if (!userData.isLoggedIn) {
        showLoginModal();
        return;
    }
    
    currentLanguage = language;
    currentCourse = courseTitle;
    
    const tutorialContent = document.getElementById('tutorialContent');
    if (!tutorialContent) return;
    
    // Show course content
    tutorialContent.innerHTML = `
        <h2>${courseTitle}</h2>
        <div class="tutorial-content">
            <p>This course will teach you the fundamentals of ${language.toUpperCase()}.</p>
            <p>Complete all lessons and pass the final quiz to earn $${courses[language].find(c => c.title === courseTitle).earnings.toFixed(2)}!</p>
            
            <div class="exercise-container">
                <div class="exercise-header">
                    <span class="exercise-title">Final Quiz</span>
                    <span class="exercise-points">+$${courses[language].find(c => c.title === courseTitle).earnings.toFixed(2)}</span>
                </div>
                <p>Take the final quiz to complete this course and earn your reward!</p>
                <button class="btn" id="startCourseQuizBtn">Take Final Quiz</button>
            </div>
        </div>
    `;
    
    const startCourseQuizBtn = document.getElementById('startCourseQuizBtn');
    if (startCourseQuizBtn) {
        startCourseQuizBtn.addEventListener('click', function() {
            startCourseQuiz(language, courseTitle);
        });
    }
    
    document.getElementById('tutorialModal').style.display = 'flex';
}

// Start course quiz
function startCourseQuiz(language, courseTitle) {
    closeModal('tutorialModal');
    currentLanguage = language;
    currentCourse = courseTitle;
    startQuiz(language, true);
}

// Start quiz - WITH LOGIN RESTRICTION
function startQuiz(language, isCourseQuiz = false) {
    if (!userData.isLoggedIn) {
        showLoginModal();
        return;
    }
    
    currentLanguage = language;
    currentQuiz = quizzes[language];
    currentQuestionIndex = 0;
    userScore = 0;
    
    const quizTitle = document.getElementById('quizTitle');
    if (quizTitle) {
        quizTitle.textContent = `${language.toUpperCase()} ${isCourseQuiz ? 'Course' : 'Knowledge'} Quiz`;
    }
    
    document.getElementById('quizModal').style.display = 'flex';
    showQuizQuestion();
}

// Show quiz question
function showQuizQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.length) {
        // Quiz completed
        const quizContainer = document.getElementById('quizContainer');
        const submitQuizButton = document.getElementById('submitQuizButton');
        const quizResult = document.getElementById('quizResult');
        
        if (quizContainer) quizContainer.innerHTML = '';
        if (submitQuizButton) submitQuizButton.style.display = 'none';
        if (quizResult) quizResult.style.display = 'block';
        
        const percentage = (userScore / currentQuiz.length) * 100;
        const passed = percentage >= 80;
        const earnings = passed ? (currentCourse ? courses[currentLanguage].find(c => c.title === currentCourse).earnings : 0.15) : 0;
        
        if (passed) {
            userData.balance += earnings;
            userData.totalEarnings += earnings;
            
            if (currentCourse) {
                userData.courseProgress[`${currentLanguage}_${currentCourse}`] = 'completed';
                userData.completedCourses++;
            }
            
            // Record certificate if it's a language proficiency quiz
            if (!currentCourse) {
                userData.certificates[currentLanguage] = {
                    score: userScore,
                    earnings: earnings,
                    date: new Date().toISOString()
                };
            }
            
            localStorage.setItem('fravicoTechUser', JSON.stringify(userData));
            updateUI();
        }
        
        const quizScore = document.getElementById('quizScore');
        const quizTotal = document.getElementById('quizTotal');
        const quizEarningsInfo = document.getElementById('quizEarningsInfo');
        
        if (quizScore) quizScore.textContent = userScore;
        if (quizTotal) quizTotal.textContent = currentQuiz.length;
        if (quizEarningsInfo) {
            quizEarningsInfo.innerHTML = passed ? 
                `You've earned <strong>$${earnings.toFixed(2)}</strong>!` : 
                'You need a score of 80% or higher to earn rewards.';
        }
        
        return;
    }
    
    const question = currentQuiz[currentQuestionIndex];
    const optionsHTML = question.options.map((option, index) => `
        <div class="quiz-option" data-index="${index}">
            <input type="radio" name="quizAnswer" id="option${index}" value="${index}">
            <label for="option${index}">${option}</label>
        </div>
    `).join('');
    
    const quizProgressFill = document.getElementById('quizProgressFill');
    if (quizProgressFill) {
        quizProgressFill.style.width = `${(currentQuestionIndex / currentQuiz.length) * 100}%`;
    }
    
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
            </div>
        `;
    }
    
    const submitQuizButton = document.getElementById('submitQuizButton');
    const quizResult = document.getElementById('quizResult');
    
    if (submitQuizButton) submitQuizButton.style.display = 'block';
    if (quizResult) quizResult.style.display = 'none';
    
    // Add event listeners to options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
}

// Submit quiz answer
function submitQuiz() {
    const selectedOption = document.querySelector('input[name="quizAnswer"]:checked');
    
    if (!selectedOption) {
        alert('Please select an answer before submitting.');
        return;
    }
    
    const selectedAnswer = parseInt(selectedOption.value);
    const currentQuestion = currentQuiz[currentQuestionIndex];
    
    if (selectedAnswer === currentQuestion.correct) {
        userScore++;
    }
    
    currentQuestionIndex++;
    showQuizQuestion();
}

// Start project - WITH LOGIN RESTRICTION
function startProject(language, projectTitle) {
    if (!userData.isLoggedIn) {
        showLoginModal();
        return;
    }
    
    const project = projects[language].find(p => p.title === projectTitle);
    const tutorialContent = document.getElementById('tutorialContent');
    
    if (!tutorialContent) return;
    
    tutorialContent.innerHTML = `
        <h2>${projectTitle}</h2>
        <div class="tutorial-content">
            <p><strong>Description:</strong> ${project.description}</p>
            <p><strong>Difficulty:</strong> ${project.difficulty}</p>
            <p><strong>Potential Earnings:</strong> $${project.earnings.toFixed(2)}</p>
            
            <div class="project-instructions">
                <h3>Project Instructions:</h3>
                <p>Complete this project by building the application described above. Once completed, submit your project files for review to earn your reward.</p>
                
                <div class="project-submission">
                    <h4>Submit Your Project</h4>
                    <textarea id="projectSubmission" placeholder="Paste your project code or GitHub repository link here..."></textarea>
                    <button class="btn" id="submitProjectBtn">Submit Project</button>
                </div>
            </div>
        </div>
    `;
    
    const submitProjectBtn = document.getElementById('submitProjectBtn');
    if (submitProjectBtn) {
        submitProjectBtn.addEventListener('click', function() {
            const submission = document.getElementById('projectSubmission').value;
            if (!submission.trim()) {
                alert('Please provide your project submission (code or GitHub link)');
                return;
            }
            
            // Simulate project submission and approval
            userData.balance += project.earnings;
            userData.totalEarnings += project.earnings;
            userData.courseProgress[`${language}_${projectTitle}`] = 'completed';
            userData.completedCourses++;
            
            localStorage.setItem('fravicoTechUser', JSON.stringify(userData));
            updateUI();
            
            alert(`Project submitted successfully! You've earned $${project.earnings.toFixed(2)}. Your project will be reviewed within 24 hours.`);
            closeModal('tutorialModal');
        });
    }
    
    document.getElementById('tutorialModal').style.display = 'flex';
}

// Show M-Pesa payment modal for exercise unlocking - WITH LOGIN RESTRICTION
function showMpesaModal(language) {
    if (!userData.isLoggedIn) {
        showLoginModal();
        return;
    }
    
    currentLanguage = language;
    document.getElementById('mpesaModal').style.display = 'flex';
}

// Process M-Pesa payment
function processMpesaPayment() {
    const mpesaNumber = document.getElementById('mpesaPaymentNumber').value;
    
    if (!mpesaNumber || mpesaNumber.length !== 10 || !(mpesaNumber.startsWith('07') || mpesaNumber.startsWith('01'))) {
        alert('Please enter a valid M-Pesa number (10 digits starting with 07 or 01)');
        return;
    }
    
    // Simulate payment processing
    alert(`Payment request sent to ${mpesaNumber}. Please confirm the payment of 36 KES on your phone to unlock the exercise.`);
    
    // Simulate successful payment and unlock exercise
    setTimeout(() => {
        unlockedExercises[currentLanguage] = true;
        localStorage.setItem('unlockedExercises', JSON.stringify(unlockedExercises));
        
        alert(`Payment confirmed! ${exercises[currentLanguage].title} has been unlocked.`);
        closeModal('mpesaModal');
        showExercises(); // Refresh exercises view
    }, 2000);
}

// Timer functions with separate timers
function startCountdown(buttonType) {
    const signupTimer = document.getElementById('signupTimer');
    const resetTimer = document.getElementById('resetTimer');
    const sendSignupCodeBtn = document.getElementById('sendSignupCodeBtn');
    const sendResetCodeBtn = document.getElementById('sendResetCodeBtn');
    
    let timerElement;
    let targetButton;
    
    if (buttonType === 'signup') {
        timerElement = signupTimer;
        targetButton = sendSignupCodeBtn;
        timeLeft = 120;
    } else if (buttonType === 'reset') {
        timerElement = resetTimer;
        targetButton = sendResetCodeBtn;
        timeLeft = 120;
    }
    
    if (timerElement) {
        timerElement.style.display = 'block';
        timerElement.textContent = '2:00';
    }
    
    if (targetButton) {
        targetButton.disabled = true;
        targetButton.textContent = 'Resend Code';
    }
    
    // Clear any existing timer
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    
    countdownTimer = setInterval(function() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            if (timerElement) {
                timerElement.style.display = 'none';
            }
            if (targetButton) {
                targetButton.disabled = false;
                targetButton.textContent = buttonType === 'signup' ? 'Send Verification Code' : 'Send Reset Code';
            }
        }
        
        timeLeft--;
    }, 1000);
}

// Send signup code - WITH TIMER
function sendSignupCode() {
    const email = document.getElementById('signupEmail').value;
    
    if (!email) {
        alert('Please enter your email address first');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate sending verification code
    alert(`Verification code sent to ${email}. Please check your inbox.`);
    startCountdown('signup');
}

// Send reset code - WITH TIMER and show additional fields
function sendResetCode() {
    const email = document.getElementById('resetEmail').value;
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate sending reset code
    alert(`Password reset code sent to ${email}. Please check your inbox.`);
    
    // Show the hidden fields
    document.getElementById('resetCodeGroup').style.display = 'block';
    document.getElementById('resetNewPasswordGroup').style.display = 'block';
    document.getElementById('resetConfirmPasswordGroup').style.display = 'block';
    document.getElementById('resetPasswordBtn').style.display = 'block';
    
    startCountdown('reset');
}

// Show login modal
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Show signup modal
function showSignup() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'flex';
}

// Show login modal from signup
function showLogin() {
    document.getElementById('signupModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'flex';
}

// Show forgot password modal
function showForgotPasswordModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('forgotPasswordModal').style.display = 'flex';
}

// Toggle login button based on input
function toggleLoginButton() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginBtn = document.getElementById('loginBtn');
    
    if (loginBtn) {
        loginBtn.disabled = !(email && password);
    }
}

// Check signup code validity
function checkSignupCode() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const code = document.getElementById('signupCode').value;
    const submitBtn = document.getElementById('signupSubmitBtn');
    
    if (submitBtn) {
        submitBtn.disabled = !(username && email && password && code);
    }
}

// Reset password
function resetPassword() {
    const email = document.getElementById('resetEmail').value;
    const code = document.getElementById('resetCode').value;
    const newPassword = document.getElementById('resetNewPassword').value;
    const confirmPassword = document.getElementById('resetConfirmPassword').value;
    
    if (!email || !code || !newPassword || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Simulate password reset
    alert('Password reset successfully! You can now login with your new password.');
    closeModal('forgotPasswordModal');
    showLoginModal();
}

// Login function
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation - in a real app, this would check against a backend
    if (email && password) {
        userData.email = email;
        userData.isLoggedIn = true;
        userData.username = email.split('@')[0]; // Use email prefix as username
        
        localStorage.setItem('fravicoTechUser', JSON.stringify(userData));
        updateUI();
        closeModal('loginModal');
        alert('Login successful!');
        
        // Refresh the current view to show protected content
        const activeTab = document.querySelector('.nav-tab.active');
        if (activeTab) {
            const action = activeTab.getAttribute('data-tab');
            switch(action) {
                case 'home':
                    showHome();
                    break;
                case 'exercises':
                    showExercises();
                    break;
                case 'projects':
                    showProjects();
                    break;
                case 'certificates':
                    showCertificates();
                    break;
            }
        }
    } else {
        alert('Please enter both email and password');
    }
}

// Signup function
function signup() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const code = document.getElementById('signupCode').value;
    
    if (!username || !email || !password || !code) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate signup process
    userData.username = username;
    userData.email = email;
    userData.isLoggedIn = true;
    
    localStorage.setItem('fravicoTechUser', JSON.stringify(userData));
    updateUI();
    closeModal('signupModal');
    alert('Account created successfully!');
    
    // Refresh the current view to show protected content
    showHome();
}