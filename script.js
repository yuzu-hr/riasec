// Variables globales
var skills = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var maxSkillLevel = 3;
var totalPoints = 18;
var currentCategory = '';
var currentFilters = {
    workContext: [],
    education: null,
    experience: null,
    workValues: []
};
var allRecommendations = [];
var currentJobsShown = 5;

// Configuration des catégories
var categories = {
    realistic: {
        name: 'Réaliste',
        icon: '🔧',
        letter: 'R',
        color: '#ff6b6b',
        skills: [
            'Faire fonctionner des machines pour produire des pièces mécaniques',
            'Faire de la maintenance sur des machines et des outils',
            'Calculer l\'aire de figures géométriques'
        ],
        indices: [0, 1, 2]
    },
    investigative: {
        name: 'Investigatif',
        icon: '🔬',
        letter: 'I',
        color: '#4ecdc4',
        skills: [
            'Lire des articles et des livres scientifiques',
            'Réaliser des analyses et des expériences en laboratoire',
            'Expliquer des phénomènes physiques naturels'
        ],
        indices: [3, 4, 5]
    },
    artistic: {
        name: 'Artistique',
        icon: '🎨',
        letter: 'A',
        color: '#a8e6cf',
        skills: [
            'Participer à la création de décors pour des pièces de théâtre',
            'Réaliser une présentation artistique devant un public',
            'Chanter dans une chorale'
        ],
        indices: [6, 7, 8]
    },
    social: {
        name: 'Social',
        icon: '🤝',
        letter: 'S',
        color: '#ffd93d',
        skills: [
            'Offrir des services sociaux dans les quartiers ou les communautés',
            'Donner des conseils sur la santé et le bien-être',
            'Être disponible pour aider les gens'
        ],
        indices: [9, 10, 11]
    },
    enterprising: {
        name: 'Entreprenant',
        icon: '💼',
        letter: 'E',
        color: '#ffb3ba',
        skills: [
            'Participer à la planification stratégique d\'entreprises',
            'Gérer les objectifs et les performances d\'équipes de travail',
            'Négocier avec des clients'
        ],
        indices: [12, 13, 14]
    },
    conventional: {
        name: 'Conventionnel',
        icon: '📋',
        letter: 'C',
        color: '#bae1ff',
        skills: [
            'Superviser le respect des lois',
            'Analyser des situations économiques nationales et internationales',
            'Archiver des documents et fichiers importants'
        ],
        indices: [15, 16, 17]
    }
};

// Base de données des métiers enrichie avec les filtres
var jobsDatabase = [
{
  "title": "Customer Service Representatives",
  "code": "CES",
  "riasec": {
    "R": 2.05,
    "I": 1.62,
    "A": 1.0,
    "S": 3.84,
    "E": 5.11,
    "C": 6.16
  },
  "description": "Interagissent avec les clients pour répondre aux questions et résoudre les problèmes",
  "workContext": {
    "indoorsControlled": 4.83,
    "indoorsNotControlled": 1.2,
    "outdoorsExposed": 1.29,
    "outdoorsCovered": 1.12,
    "vehicle": 1.15 // Moyenne des véhicules ouverts/fermés
  },
  "education": {
    "1": 0.0, "2": 54.76, "3": 0.0, "4": 17.36, "5": 13.67, "6": 14.22, "7": 0.0, "8": 0.0, "9": 0.0, "10": 0.0, "11": 0.0, "12": 0.0
  },
  "experience": {
    "1": 11.07, "2": 2.07, "3": 10.11, "4": 0.1, "5": 25.59, "6": 22.96, "7": 5.96, "8": 20.06, "9": 0.0, "10": 0.0, "11": 2.07
  },
  "workValues": {
    "scores": {
      "achievement": 3.0,
      "workingConditions": 2.83,
      "recognition": 3.0,
      "relationships": 6.0,
      "support": 4.33,
      "independence": 3.67
    },
    "highPoints": ["relationships", "support", "independence"]
  }
},
{
  "title": "Eligibility Interviewers, Government Programs",
  "code": "CSE",
  "riasec": {
    "R": 1.0,
    "I": 2.46,
    "A": 1.0,
    "S": 4.44,
    "E": 3.93,
    "C": 6.35
  },
  "description": "Déterminent l'éligibilité des demandeurs aux programmes gouvernementaux",
  "workContext": {
    "indoorsControlled": 3.96,
    "indoorsNotControlled": 1.26,
    "outdoorsExposed": 1.38,
    "outdoorsCovered": 1.16,
    "vehicle": 1.61
  },
  "education": {
    "1": 0.0, "2": 25.6, "3": 0.0, "4": 19.44, "5": 23.58, "6": 24.22, "7": 0.0, "8": 7.15, "9": 0.0, "10": 0.0, "11": 0.0, "12": 0.0
  },
  "experience": {
    "1": 24.29, "2": 2.29, "3": 0.0, "4": 1.95, "5": 14.85, "6": 35.93, "7": 20.69, "8": 0.0, "9": 0.0, "10": 0.0, "11": 0.0
  },
  "workValues": {
    "scores": {
      "achievement": 3.67,
      "workingConditions": 4.17,
      "recognition": 3.33,
      "relationships": 5.0,
      "support": 4.67,
      "independence": 4.33
    },
    "highPoints": ["relationships", "support", "independence"]
  }
},
{
  "title": "File Clerks",
  "code": "CRS",
  "riasec": {
    "R": 2.53,
    "I": 1.38,
    "A": 1.15,
    "S": 1.92,
    "E": 1.66,
    "C": 7.0
  },
  "description": "Classent et organisent les documents et dossiers pour un accès facile",
  "workContext": {
    "indoorsControlled": 3.73,
    "indoorsNotControlled": 1.05,
    "outdoorsExposed": 1.06,
    "outdoorsCovered": 1.04,
    "vehicle": 1.25
  },
  "education": {
    "1": 7.11, "2": 40.08, "3": 10.59, "4": 4.97, "5": 10.36, "6": 1.25, "7": 0.0, "8": 25.13, "9": 0.0, "10": 0.0, "11": 0.0, "12": 0.51
  },
  "experience": {
    "1": 37.37, "2": 1.25, "3": 0.09, "4": 1.33, "5": 19.08, "6": 12.71, "7": 4.75, "8": 22.3, "9": 1.11, "10": 0.0, "11": 0.0
  },
  "workValues": {
    "scores": {
      "achievement": 2.33,
      "workingConditions": 2.17,
      "recognition": 2.0,
      "relationships": 3.33,
      "support": 4.33,
      "independence": 2.67
    },
    "highPoints": ["support", "relationships", "independence"]
  }
},
{
  "title": "Hotel, Motel, and Resort Desk Clerks",
  "code": "CSE",
  "riasec": {
    "R": 2.62,
    "I": 1.0,
    "A": 1.33,
    "S": 4.48,
    "E": 3.81,
    "C": 5.71
  },
  "description": "Accueillent et assistent les clients dans les établissements d'hébergement",
  "workContext": {
    "indoorsControlled": 4.37,
    "indoorsNotControlled": 1.16,
    "outdoorsExposed": 1.42,
    "outdoorsCovered": 1.25,
    "vehicle": 1.42
  },
  "education": {
    "1": 1.0, "2": 75.03, "3": 2.42, "4": 10.79, "5": 6.17, "6": 4.6, "7": 0.0, "8": 0.0, "9": 0.0, "10": 0.0, "11": 0.0, "12": 0.0
  },
  "experience": {
    "1": 51.87, "2": 0.0, "3": 1.36, "4": 14.07, "5": 17.66, "6": 9.57, "7": 5.18, "8": 0.29, "9": 0.0, "10": 0.0, "11": 0.0
  },
  "workValues": {
    "scores": {
      "achievement": 2.33,
      "workingConditions": 2.17,
      "recognition": 2.33,
      "relationships": 6.0,
      "support": 3.67,
      "independence": 3.0
    },
    "highPoints": ["relationships", "support", "independence"]
  }
}
];

// Fonctions utilitaires
function getAvailablePoints() {
    var used = 0;
    for (var i = 0; i < skills.length; i++) {
        used += skills[i];
    }
    return totalPoints - used;
}

function getCategoryScores() {
    var scores = {};
    var categoryKeys = Object.keys(categories);
    for (var i = 0; i < categoryKeys.length; i++) {
        var key = categoryKeys[i];
        var category = categories[key];
        var total = 0;
        for (var j = 0; j < category.indices.length; j++) {
            total += skills[category.indices[j]];
        }
        scores[key] = total;
    }
    return scores;
}

function generateRiasecCode() {
    var scores = getCategoryScores();
    var sortedCategories = Object.keys(scores).sort(function(a, b) {
        return scores[b] - scores[a];
    }).slice(0, 3);
    
    var code = '';
    for (var i = 0; i < sortedCategories.length; i++) {
        code += categories[sortedCategories[i]].letter;
    }
    return code || 'RIA';
}

function calculateJobCompatibility(userScores, jobRiasec) {
    try {
        var userVector = [
            userScores.realistic || 0,
            userScores.investigative || 0,
            userScores.artistic || 0,
            userScores.social || 0,
            userScores.enterprising || 0,
            userScores.conventional || 0
        ];
        
        var jobVector = [
            jobRiasec.R || 0,
            jobRiasec.I || 0,
            jobRiasec.A || 0,
            jobRiasec.S || 0,
            jobRiasec.E || 0,
            jobRiasec.C || 0
        ];
        
        var dotProduct = 0;
        for (var i = 0; i < 6; i++) {
            dotProduct += userVector[i] * jobVector[i];
        }
        
        var userNorm = 0;
        var jobNorm = 0;
        
        for (var i = 0; i < 6; i++) {
            userNorm += userVector[i] * userVector[i];
            jobNorm += jobVector[i] * jobVector[i];
        }
        
        userNorm = Math.sqrt(userNorm);
        jobNorm = Math.sqrt(jobNorm);
        
        if (userNorm === 0 || jobNorm === 0) {
            return 0;
        }
        
        var cosineSimilarity = dotProduct / (userNorm * jobNorm);
        var compatibilityScore = Math.max(0, cosineSimilarity * 100);
        
        return compatibilityScore;
        
    } catch (error) {
        console.error('Error calculating compatibility:', error);
        return 0;
    }
}

// Fonctions de filtrage avancé
function filterByWorkContext(jobs, selectedEnvironments) {
    if (selectedEnvironments.length === 0) return jobs;
    
    return jobs.filter(function(job) {
        return selectedEnvironments.some(function(env) {
            var score = job.workContext[env] || 0;
            return score >= 3.5; // Seuil significatif
        });
    });
}

function filterByEducation(jobs, userEducationLevel) {
    if (!userEducationLevel) return jobs;
    
    return jobs.filter(function(job) {
        var cumulativePercentage = 0;
        
        for (var level = 1; level <= userEducationLevel; level++) {
            cumulativePercentage += job.education[level] || 0;
        }
        
        return cumulativePercentage >= 30; // 30% des pros ont ce niveau ou moins
    });
}

function filterByExperience(jobs, userExperienceLevel) {
    if (!userExperienceLevel) return jobs;
    
    var experienceMapping = {
        "debutant": [1, 2, 3],        // 0-3 mois
        "junior": [1, 2, 3, 4, 5, 6], // 0-2 ans
        "confirme": [1, 2, 3, 4, 5, 6, 7, 8], // 0-6 ans
        "senior": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] // Toutes
    };
    
    return jobs.filter(function(job) {
        var acceptableCategories = experienceMapping[userExperienceLevel];
        var cumulativePercentage = 0;
        
        acceptableCategories.forEach(function(cat) {
            cumulativePercentage += job.experience[cat] || 0;
        });
        
        return cumulativePercentage >= 40; // 40% des pros ont expérience compatible
    });
}

function convertHighPointsFromNumbers(highPointsArray) {
    // Conversion des codes numériques vers les noms des valeurs
    var mapping = {
        "1": "achievement",
        "2": "workingConditions", 
        "3": "recognition",
        "4": "relationships",
        "5": "support",
        "6": "independence"
    };
    
    return highPointsArray.map(function(code) {
        return mapping[code] || code;
    });
}

function filterByWorkValues(jobs, selectedValues) {
    if (selectedValues.length === 0) return jobs;
    
    if (selectedValues.length > 3) {
        return jobs.filter(function(job) {
            // Convertir les highPoints numériques si nécessaire
            var jobHighPoints = job.workValues.highPoints;
            if (jobHighPoints.length > 0 && typeof jobHighPoints[0] === 'string' && !isNaN(jobHighPoints[0])) {
                jobHighPoints = convertHighPointsFromNumbers(jobHighPoints);
            }
            
            var matches = selectedValues.filter(function(value) {
                return jobHighPoints.includes(value);
            }).length;
            return matches >= 2; // Plus strict si plus de 3 sélections
        });
    } else {
        return jobs.filter(function(job) {
            // Convertir les highPoints numériques si nécessaire
            var jobHighPoints = job.workValues.highPoints;
            if (jobHighPoints.length > 0 && typeof jobHighPoints[0] === 'string' && !isNaN(jobHighPoints[0])) {
                jobHighPoints = convertHighPointsFromNumbers(jobHighPoints);
            }
            
            return selectedValues.some(function(value) {
                return jobHighPoints.includes(value);
            });
        });
    }
}

function applyAllFilters(jobs, filters) {
    var filteredJobs = jobs;
    
    if (filters.workContext.length > 0) {
        filteredJobs = filterByWorkContext(filteredJobs, filters.workContext);
        console.log('Après Work Context:', filteredJobs.length, 'métiers');
    }
    
    if (filters.education) {
        filteredJobs = filterByEducation(filteredJobs, filters.education);
        console.log('Après Education:', filteredJobs.length, 'métiers');
    }
    
    if (filters.experience) {
        filteredJobs = filterByExperience(filteredJobs, filters.experience);
        console.log('Après Experience:', filteredJobs.length, 'métiers');
    }
    
    if (filters.workValues.length > 0) {
        filteredJobs = filterByWorkValues(filteredJobs, filters.workValues);
        console.log('Après Work Values:', filteredJobs.length, 'métiers');
    }
    
    return filteredJobs;
}

function recommendJobs(userCategoryScores) {
    var jobsWithCompatibility = [];
    
    for (var i = 0; i < jobsDatabase.length; i++) {
        var job = jobsDatabase[i];
        var compatibility = calculateJobCompatibility(userCategoryScores, job.riasec);
        jobsWithCompatibility.push({
            title: job.title,
            code: job.code,
            riasec: job.riasec,
            description: job.description,
            compatibility: Math.round(compatibility),
            workContext: job.workContext,
            education: job.education,
            experience: job.experience,
            workValues: job.workValues
        });
    }

    jobsWithCompatibility.sort(function(a, b) {
        return b.compatibility - a.compatibility;
    });

    allRecommendations = jobsWithCompatibility;
    return jobsWithCompatibility.slice(0, 5);
}

function getProfileInfo(riasecCode) {
    var firstTwo = riasecCode.substring(0, 2).toUpperCase();
    
    var profiles = {
        'RI': { name: 'Le Bâtisseur', icon: '🏗️', description: 'Vous combinez pragmatisme et curiosité scientifique' },
        'IR': { name: 'Le Bâtisseur', icon: '🏗️', description: 'Vous combinez pragmatisme et curiosité scientifique' },
        'RA': { name: 'L\'Artisan', icon: '🎨', description: 'Vous créez avec vos mains et votre imagination' },
        'AR': { name: 'L\'Artisan', icon: '🎨', description: 'Vous créez avec vos mains et votre imagination' },
        'RS': { name: 'Le Secouriste', icon: '🚑', description: 'Vous aidez concrètement les autres' },
        'SR': { name: 'Le Secouriste', icon: '🚑', description: 'Vous aidez concrètement les autres' },
        'RE': { name: 'L\'Initiateur', icon: '🚀', description: 'Vous lancez des projets pratiques' },
        'ER': { name: 'L\'Initiateur', icon: '🚀', description: 'Vous lancez des projets pratiques' },
        'RC': { name: 'Le Logisticien', icon: '📦', description: 'Vous organisez et optimisez les systèmes' },
        'CR': { name: 'Le Logisticien', icon: '📦', description: 'Vous organisez et optimisez les systèmes' },
        'IA': { name: 'L\'Explorateur', icon: '🔍', description: 'Vous découvrez et exprimez vos trouvailles' },
        'AI': { name: 'L\'Explorateur', icon: '🔍', description: 'Vous découvrez et exprimez vos trouvailles' },
        'IS': { name: 'Le Soignant', icon: '💚', description: 'Vous analysez pour mieux aider les autres' },
        'SI': { name: 'Le Soignant', icon: '💚', description: 'Vous analysez pour mieux aider les autres' },
        'IE': { name: 'L\'Innovateur', icon: '💡', description: 'Vous transformez vos idées en opportunités' },
        'EI': { name: 'L\'Innovateur', icon: '💡', description: 'Vous transformez vos idées en opportunités' },
        'IC': { name: 'L\'Analyste', icon: '📊', description: 'Vous décortiquez et structurez l\'information' },
        'CI': { name: 'L\'Analyste', icon: '📊', description: 'Vous décortiquez et structurez l\'information' },
        'AS': { name: 'Le Médiateur', icon: '🤝', description: 'Vous créez du lien et de l\'harmonie' },
        'SA': { name: 'Le Médiateur', icon: '🤝', description: 'Vous créez du lien et de l\'harmonie' },
        'AE': { name: 'Le Stratège', icon: '🎯', description: 'Vous concevez des visions créatives' },
        'EA': { name: 'Le Stratège', icon: '🎯', description: 'Vous concevez des visions créatives' },
        'AC': { name: 'L\'Ordonneur', icon: '📋', description: 'Vous structurez avec créativité' },
        'CA': { name: 'L\'Ordonneur', icon: '📋', description: 'Vous structurez avec créativité' },
        'SE': { name: 'Le Leader', icon: '👑', description: 'Vous mobilisez et dirigez les équipes' },
        'ES': { name: 'Le Leader', icon: '👑', description: 'Vous mobilisez et dirigez les équipes' },
        'SC': { name: 'L\'Éducateur', icon: '🎓', description: 'Vous transmettez et organisez les savoirs' },
        'CS': { name: 'L\'Éducateur', icon: '🎓', description: 'Vous transmettez et organisez les savoirs' },
        'EC': { name: 'Le Coordinateur', icon: '⚙️', description: 'Vous orchestrez et gérez efficacement' },
        'CE': { name: 'Le Coordinateur', icon: '⚙️', description: 'Vous orchestrez et gérez efficacement' }
    };
    
    return profiles[firstTwo] || { 
        name: 'Le Polyvalent', 
        icon: '🌟', 
        description: 'Vous avez un profil unique et équilibré' 
    };
}

// Fonctions de gestion des filtres
function updateFilters() {
    // Récupérer les valeurs des filtres
    var workContextInputs = document.querySelectorAll('input[value="indoorsControlled"], input[value="indoorsNotControlled"], input[value="outdoorsCovered"], input[value="outdoorsExposed"], input[value="vehicle"]');
    currentFilters.workContext = [];
    for (var i = 0; i < workContextInputs.length; i++) {
        if (workContextInputs[i].checked) {
            currentFilters.workContext.push(workContextInputs[i].value);
        }
    }
    
    var educationInput = document.querySelector('input[name="education"]:checked');
    currentFilters.education = educationInput ? parseInt(educationInput.value) : null;
    
    var experienceInput = document.querySelector('input[name="experience"]:checked');
    currentFilters.experience = experienceInput ? experienceInput.value : null;
    
    // Les work values sont gérés séparément
    
    updateFilteredJobsCount();
}

function updateWorkValues(checkbox) {
    var workValueInputs = document.querySelectorAll('input[value="achievement"], input[value="independence"], input[value="recognition"], input[value="relationships"], input[value="support"], input[value="workingConditions"]');
    var checkedValues = [];
    
    for (var i = 0; i < workValueInputs.length; i++) {
        if (workValueInputs[i].checked) {
            checkedValues.push(workValueInputs[i].value);
        }
    }
    
    // Limiter à 3 sélections maximum
    if (checkedValues.length > 3) {
        checkbox.checked = false;
        showNotification('💡 Maximum 3 motivations sélectionnées');
        return;
    }
    
    // Désactiver les autres options si 3 sont sélectionnées
    for (var i = 0; i < workValueInputs.length; i++) {
        if (!workValueInputs[i].checked && checkedValues.length >= 3) {
            workValueInputs[i].disabled = true;
        } else {
            workValueInputs[i].disabled = false;
        }
    }
    
    currentFilters.workValues = checkedValues;
    updateFilteredJobsCount();
}

function updateFilteredJobsCount() {
    var baseRecommendations = allRecommendations.slice(); // Copie des recommandations de base
    var filteredJobs = applyAllFilters(baseRecommendations, currentFilters);
    
    var countElement = document.getElementById('filteredJobsCount');
    if (countElement) {
        countElement.textContent = filteredJobs.length;
    }
}

function applyFilters() {
    if (allRecommendations.length === 0) {
        showNotification('⚠️ Effectuez d\'abord l\'évaluation RIASEC');
        return;
    }
    
    var filteredJobs = applyAllFilters(allRecommendations.slice(), currentFilters);
    
    if (filteredJobs.length === 0) {
        showNotification('❌ Aucun métier ne correspond à vos critères. Essayez des filtres moins restrictifs.');
        return;
    }
    
    // Mettre à jour l'affichage avec les métiers filtrés
    currentJobsShown = Math.min(5, filteredJobs.length);
    allRecommendations = filteredJobs;
    
    updateJobsDisplay();
    updateShowMoreButton();
    
    showNotification('✨ Filtres appliqués ! ' + filteredJobs.length + ' métiers trouvés');
    
    // Scroll vers les résultats
    var recommendations = document.getElementById('jobRecommendations');
    if (recommendations) {
        recommendations.scrollIntoView({ behavior: 'smooth' });
    }
}

function resetFilters() {
    // Réinitialiser les filtres
    currentFilters = {
        workContext: [],
        education: null,
        experience: null,
        workValues: []
    };
    
    // Décocher tous les inputs
    var allInputs = document.querySelectorAll('.filter-options input');
    for (var i = 0; i < allInputs.length; i++) {
        allInputs[i].checked = false;
        allInputs[i].disabled = false;
    }
    
    // Restaurer les recommandations originales
    if (allRecommendations.length > 0) {
        var scores = getCategoryScores();
        var originalRecommendations = recommendJobs(scores);
        allRecommendations = [];
        
        // Recalculer les recommandations originales
        for (var i = 0; i < jobsDatabase.length; i++) {
            var job = jobsDatabase[i];
            var compatibility = calculateJobCompatibility(scores, job.riasec);
            allRecommendations.push({
                title: job.title,
                code: job.code,
                riasec: job.riasec,
                description: job.description,
                compatibility: Math.round(compatibility),
                workContext: job.workContext,
                education: job.education,
                experience: job.experience,
                workValues: job.workValues
            });
        }
        
        allRecommendations.sort(function(a, b) {
            return b.compatibility - a.compatibility;
        });
        
        currentJobsShown = 5;
        updateJobsDisplay();
        updateShowMoreButton();
    }
    
    updateFilteredJobsCount();
    showNotification('🔄 Filtres réinitialisés');
}

// Fonctions principales
function showNotification(message) {
    var notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(function() {
        notification.classList.remove('show');
    }, 2500);
}

function updateDisplay() {
    var usedPoints = 0;
    for (var i = 0; i < skills.length; i++) {
        usedPoints += skills[i];
    }
    var remainingPoints = totalPoints - usedPoints;
    
    document.getElementById('availablePoints').textContent = remainingPoints;
    document.getElementById('usedPoints').textContent = usedPoints;
    
    var developedCategories = 0;
    var categoryKeys = Object.keys(categories);
    for (var i = 0; i < categoryKeys.length; i++) {
        var category = categories[categoryKeys[i]];
        var hasSkills = false;
        for (var j = 0; j < category.indices.length; j++) {
            if (skills[category.indices[j]] > 0) {
                hasSkills = true;
                break;
            }
        }
        if (hasSkills) developedCategories++;
    }
    
    document.getElementById('developedCategories').textContent = developedCategories;
    
    var completeButton = document.getElementById('completeButton');
    if (remainingPoints === 0) {
        completeButton.disabled = false;
        completeButton.textContent = 'Terminer l\'évaluation';
    } else {
        completeButton.disabled = true;
        completeButton.textContent = 'Distribuez les ' + remainingPoints + ' points restants';
    }
    
    var categoryKeys = Object.keys(categories);
    for (var i = 0; i < categoryKeys.length; i++) {
        var categoryKey = categoryKeys[i];
        var category = categories[categoryKey];
        var icon = document.querySelector('[data-category="' + categoryKey + '"]');
        if (!icon) continue;
        
        var hasSkills = false;
        for (var j = 0; j < category.indices.length; j++) {
            if (skills[category.indices[j]] > 0) {
                hasSkills = true;
                break;
            }
        }
        
        if (hasSkills) {
            icon.style.background = 'linear-gradient(135deg, rgba(0, 255, 136, 0.4), rgba(0, 255, 136, 0.2))';
            icon.style.borderColor = '#00ff88';
            icon.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.4)';
        } else {
            icon.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.1))';
            icon.style.borderColor = '#ffd700';
            icon.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.3)';
        }
    }
}

function openSkillsPanel(categoryKey) {
    console.log('Opening skills panel for:', categoryKey);
    currentCategory = categoryKey;
    var category = categories[categoryKey];
    
    document.getElementById('categoryIcon').textContent = category.icon;
    document.getElementById('categoryTitle').textContent = category.name;
    
    var icons = document.querySelectorAll('.category-icon');
    for (var i = 0; i < icons.length; i++) {
        icons[i].classList.remove('active');
    }
    document.querySelector('[data-category="' + categoryKey + '"]').classList.add('active');
    
    renderSkillsList(categoryKey);
    document.getElementById('skillsPanel').classList.add('open');
}

function closeSkillsPanel() {
    document.getElementById('skillsPanel').classList.remove('open');
    var icons = document.querySelectorAll('.category-icon');
    for (var i = 0; i < icons.length; i++) {
        icons[i].classList.remove('active');
    }
    currentCategory = '';
}

function renderSkillsList(categoryKey) {
    var category = categories[categoryKey];
    var skillsList = document.getElementById('skillsList');
    var html = '';
    
    for (var i = 0; i < category.skills.length; i++) {
        var skillName = category.skills[i];
        var skillIndex = category.indices[i];
        var skillLevel = skills[skillIndex];
        
        html += '<div class="skill-node ' + (skillLevel > 0 ? 'selected' : '') + '">';
        html += '<div class="skill-name">' + skillName + '</div>';
        html += '<div class="skill-controls">';
        html += '<button class="skill-button" onclick="decreaseSkill(' + skillIndex + ')" ' + (skillLevel <= 0 ? 'disabled' : '') + '>−</button>';
        html += '<div class="skill-level">';
        
        for (var j = 1; j <= 3; j++) {
            html += '<div class="level-dot ' + (skillLevel >= j ? 'filled' : '') + '"></div>';
        }
        
        html += '</div>';
        html += '<button class="skill-button" onclick="increaseSkill(' + skillIndex + ')" ' + (skillLevel >= maxSkillLevel || getAvailablePoints() <= 0 ? 'disabled' : '') + '>+</button>';
        html += '</div></div>';
    }
    
    skillsList.innerHTML = html;
}

function increaseSkill(index) {
    console.log('Increasing skill:', index);
    if (skills[index] >= maxSkillLevel) {
        showNotification('⚠️ Compétence au niveau maximum !');
        return;
    }
    
    if (getAvailablePoints() <= 0) {
        showNotification('❌ Points insuffisants !');
        return;
    }
    
    skills[index]++;
    updateDisplay();
    
    if (currentCategory) {
        renderSkillsList(currentCategory);
    }
}

function decreaseSkill(index) {
    console.log('Decreasing skill:', index);
    if (skills[index] <= 0) {
        showNotification('⚠️ Compétence déjà au minimum !');
        return;
    }
    
    skills[index]--;
    updateDisplay();
    
    if (currentCategory) {
        renderSkillsList(currentCategory);
    }
}

function createBarChart(scores) {
    var barChart = document.getElementById('barChart');
    if (!barChart) return;
    
    var maxScore = Math.max.apply(Math, Object.values(scores));
    var html = '';
    var categoryKeys = Object.keys(categories);
    
    for (var i = 0; i < categoryKeys.length; i++) {
        var categoryKey = categoryKeys[i];
        var category = categories[categoryKey];
        var score = scores[categoryKey] || 0;
        
        html += '<div class="bar-item">';
        html += '<div class="bar-label">' + category.name + '</div>';
        html += '<div class="bar-container">';
        html += '<div class="bar-fill" style="width: 0%; background: linear-gradient(135deg, ' + category.color + ', ' + category.color + 'cc);">';
        html += score + ' pts';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    
    barChart.innerHTML = html;
    
    setTimeout(function() {
        var bars = document.querySelectorAll('.bar-fill');
        for (var i = 0; i < bars.length; i++) {
            var categoryKey = categoryKeys[i];
            var score = scores[categoryKey] || 0;
            var percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
            bars[i].style.width = percentage + '%';
        }
    }, 100);
}

function createJobRecommendations(scores) {
    var recommendations = recommendJobs(scores);
    
    var html = '<div class="recommendations-section">';
    html += '<h3 class="recommendations-title">💼 Top 5 Métiers Recommandés</h3>';
    html += '<p class="recommendations-subtitle">Parmi ' + jobsDatabase.length + ' métiers O*NET - Algorithme de similarité cosinus</p>';
    html += '<div class="jobs-grid">';
    
    for (var i = 0; i < recommendations.length; i++) {
        var job = recommendations[i];
        var compatibility = job.compatibility;
        var color = compatibility >= 85 ? '#00ff88' : compatibility >= 70 ? '#ffd700' : compatibility >= 50 ? '#ff9500' : '#ff6b6b';
        
        html += '<div class="job-card">';
        html += '<div class="job-header">';
        html += '<h4 class="job-title">' + job.title + '</h4>';
        html += '<div class="job-compatibility" style="color: ' + color + '">' + compatibility + '% compatible</div>';
        html += '</div>';
        html += '<div class="job-code">Code RIASEC: ' + job.code + '</div>';
        html += '<div class="job-description">' + job.description + '</div>';
        html += '<div class="job-rank">#' + (i + 1) + '</div>';
        html += '</div>';
    }
    
    html += '</div>';
    html += '<div class="view-controls">';
    html += '<button id="showMoreBtn" class="show-more-btn" onclick="showMoreJobs()">Voir plus de métiers (5/' + allRecommendations.length + ')</button>';
    html += '</div>';
    html += '<div style="text-align: center; margin-top: 15px; font-size: 12px; color: #a0a0ff;">';
    html += '✨ Algorithme de similarité cosinus • 85%+ = Excellent • 70%+ = Bon • 50%+ = Modéré';
    html += '</div>';
    html += '</div>';
    return html;
}

function updateJobsDisplay() {
    var jobsGrid = document.querySelector('.jobs-grid');
    if (!jobsGrid) return;
    
    var html = '';
    
    for (var i = 0; i < Math.min(currentJobsShown, allRecommendations.length); i++) {
        var job = allRecommendations[i];
        var compatibility = job.compatibility;
        var color = compatibility >= 85 ? '#00ff88' : compatibility >= 70 ? '#ffd700' : compatibility >= 50 ? '#ff9500' : '#ff6b6b';
        
        html += '<div class="job-card">';
        html += '<div class="job-header">';
        html += '<h4 class="job-title">' + job.title + '</h4>';
        html += '<div class="job-compatibility" style="color: ' + color + '">' + compatibility + '% compatible</div>';
        html += '</div>';
        html += '<div class="job-code">Code RIASEC: ' + job.code + '</div>';
        html += '<div class="job-description">' + job.description + '</div>';
        html += '<div class="job-rank">#' + (i + 1) + '</div>';
        html += '</div>';
    }
    
    jobsGrid.innerHTML = html;
}

function updateShowMoreButton() {
    var button = document.getElementById('showMoreBtn');
    if (!button) return;
    
    if (currentJobsShown >= allRecommendations.length) {
        button.textContent = 'Tous les métiers affichés (' + allRecommendations.length + '/' + allRecommendations.length + ')';
        button.disabled = true;
    } else {
        button.textContent = 'Voir plus de métiers (' + currentJobsShown + '/' + allRecommendations.length + ')';
        button.disabled = false;
    }
}

function showMoreJobs() {
    currentJobsShown += 5;
    if (currentJobsShown >= allRecommendations.length) {
        currentJobsShown = allRecommendations.length;
    }
    
    updateJobsDisplay();
    updateShowMoreButton();
}

function showResults() {
    console.log('showResults called!');
    
    var scores = getCategoryScores();
    var riasecCode = generateRiasecCode();
    
    console.log('Scores:', scores);
    console.log('RIASEC Code:', riasecCode);
    console.log('Analyzing', jobsDatabase.length, 'jobs with cosine similarity algorithm...');
    
    var codeElement = document.getElementById('riasecCode');
    if (codeElement) {
        codeElement.textContent = riasecCode;
    }
    
    var profileInfo = getProfileInfo(riasecCode);
    var profileElement = document.getElementById('profileInfo');
    if (profileElement) {
        profileElement.innerHTML = 
            '<div class="profile-icon">' + profileInfo.icon + '</div>' +
            '<div class="profile-name">' + profileInfo.name + '</div>' +
            '<div class="profile-description">' + profileInfo.description + '</div>';
    }
    
    createBarChart(scores);
    
    var recommendationsContainer = document.getElementById('jobRecommendations');
    if (recommendationsContainer) {
        recommendationsContainer.innerHTML = createJobRecommendations(scores);
    }
    
    // Réinitialiser les filtres et le compteur
    updateFilteredJobsCount();
    
    var modal = document.getElementById('resultsModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        console.log('Modal displayed with advanced filters and', jobsDatabase.length, 'jobs!');
    }
    
    closeSkillsPanel();
}

function closeResults() {
    var modal = document.getElementById('resultsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function closeModalIfClickedOutside(event) {
    if (event.target === event.currentTarget) {
        closeResults();
    }
}

// Initialisation
setTimeout(function() {
    updateDisplay();
    console.log('RIASEC enhanced initialized with', jobsDatabase.length, 'jobs and advanced filtering!');
}, 200);