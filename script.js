// Funzione per verificare se l'utente è loggato
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
    }
}

// Funzione per il logout
function logout() {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Funzione per aprire il menu mobile
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Funzione per aprire/chiudere gli accordion
function toggleAccordion(element) {
    element.classList.toggle('active');
}

// Funzione per filtrare gli esami nella tabella del libretto
function filterExams() {
    const filterValue = document.getElementById('filter').value;
    const tableRows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        const statusCell = row.querySelector('.status-cell');
        const statusClass = statusCell.querySelector('.status-indicator').classList;
        
        if (filterValue === 'all') {
            row.style.display = '';
        } else if (filterValue === 'passed' && statusClass.contains('status-success')) {
            row.style.display = '';
        } else if (filterValue === 'failed' && statusClass.contains('status-danger')) {
            row.style.display = '';
        } else if (filterValue === 'planned' && statusClass.contains('status-warning')) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Funzione per cercare esami nella tabella
function searchExams() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const tableRows = document.querySelectorAll('.table tbody tr');
    
    tableRows.forEach(row => {
        const examName = row.querySelector('.exam-name').textContent.toLowerCase();
        const examCode = row.querySelector('.exam-code').textContent.toLowerCase();
        
        if (examName.includes(searchInput) || examCode.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Funzione per caricare i dettagli di un esame specifico
function loadExamDetails(examCode) {
    // Dati degli esami (in un'applicazione reale, questi dati verrebbero dal server)
    const examData = {
        'CT0562': {
            code: 'CT0562',
            name: 'ALGEBRA LINEARE',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Voto Finale',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'ALGEBRA LINEARE',
                    type: 'LEZ',
                    formType: 'A - Base',
                    sector: 'MAT/02 - ALGEBRA',
                    cfu: 6,
                    duration: 48
                }
            ],
            grade: 30
        },
        'CT0560': {
            code: 'CT0560',
            name: 'ANALISI MATEMATICA I',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Voto Finale',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'ANALISI MATEMATICA I',
                    type: 'LEZ',
                    formType: 'A - Base',
                    sector: 'MAT/05 - ANALISI MATEMATICA',
                    cfu: 9,
                    duration: 72
                }
            ],
            grade: 28
        },
        'CT0561': {
            code: 'CT0561',
            name: 'ANALISI MATEMATICA II',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Voto Finale',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'ANALISI MATEMATICA II',
                    type: 'LEZ',
                    formType: 'A - Base',
                    sector: 'MAT/05 - ANALISI MATEMATICA',
                    cfu: 9,
                    duration: 72
                }
            ],
            grade: 28
        },
        'CT0564': {
            code: 'CT0564',
            name: 'FISICA I',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Voto Finale',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'FISICA I',
                    type: 'LEZ',
                    formType: 'A - Base',
                    sector: 'FIS/01 - FISICA SPERIMENTALE',
                    cfu: 9,
                    duration: 72
                }
            ],
            grade: 30
        },
        'CT0568': {
            code: 'CT0568',
            name: 'FONDAMENTI DI CHIMICA',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Voto Finale',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'FONDAMENTI DI CHIMICA',
                    type: 'LEZ',
                    formType: 'A - Base',
                    sector: 'CHIM/07 - FONDAMENTI CHIMICI DELLE TECNOLOGIE',
                    cfu: 6,
                    duration: 48
                }
            ],
            grade: 28
        },
        'CT0569': {
            code: 'CT0569',
            name: 'INFORMATICA I',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Voto Finale',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'INFORMATICA I',
                    type: 'LEZ',
                    formType: 'A - Base',
                    sector: 'INF/01 - INFORMATICA',
                    cfu: 12,
                    duration: 96
                }
            ],
            grade: 29
        },
        'CLA-B1': {
            code: 'CLA-B1',
            name: 'LINGUA INGLESE B1',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Esame',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'LINGUA INGLESE B1',
                    type: 'LEZ',
                    formType: 'E - Lingua/Prova Finale',
                    sector: 'L-LIN/12 - LINGUA E TRADUZIONE - LINGUA INGLESE',
                    cfu: 0,
                    duration: 0
                }
            ],
            grade: 'Superato'
        },
        'CLA-B2': {
            code: 'CLA-B2',
            name: 'LINGUA INGLESE B2',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Esame',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'LINGUA INGLESE B2',
                    type: 'LEZ',
                    formType: 'E - Lingua/Prova Finale',
                    sector: 'L-LIN/12 - LINGUA E TRADUZIONE - LINGUA INGLESE',
                    cfu: 3,
                    duration: 24
                }
            ],
            grade: 'Superato'
        },
        'CT0000': {
            code: 'CT0000',
            name: 'LOGICA-MATEMATICA (OBBLIGO FORMATIVO AGGIUNTIVO)',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Esame',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'LOGICA-MATEMATICA',
                    type: 'LEZ',
                    formType: 'F - Altre',
                    sector: 'MAT/01 - LOGICA MATEMATICA',
                    cfu: 0,
                    duration: 0
                }
            ],
            grade: 'Superato'
        },
        'SIC001': {
            code: 'SIC001',
            name: 'SICUREZZA E SALUTE NELLE ATTIVITÀ DIDATTICHE E DI RICERCA',
            year: 1,
            status: 'Superato',
            examType: 'Scritto',
            evaluationType: 'Idoneità',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'SICUREZZA E SALUTE NELLE ATTIVITÀ DIDATTICHE E DI RICERCA',
                    type: 'LEZ',
                    formType: 'F - Altre',
                    sector: 'ING-IND/28 - INGEGNERIA E SICUREZZA DEGLI SCAVI',
                    cfu: 1,
                    duration: 8
                }
            ],
            grade: 'Idoneo'
        },
        'CT0563': {
            code: 'CT0563',
            name: 'STATISTICA',
            year: 1,
            status: 'Non Superato',
            examType: 'Scritto',
            evaluationType: 'Voto Finale',
            note: 'Attività didattica collegata al piano',
            frequency: 'Frequentato',
            units: [
                {
                    name: 'STATISTICA',
                    type: 'LEZ',
                    formType: 'A - Base',
                    sector: 'SECS-S/01 - STATISTICA',
                    cfu: 6,
                    duration: 48
                }
            ],
            grade: null
        }
    };

    // Ottieni i dati dell'esame selezionato
    const exam = examData[examCode];
    if (!exam) {
        console.error('Esame non trovato:', examCode);
        return;
    }

    // Aggiorna il titolo della pagina
    document.getElementById('exam-title').textContent = `${exam.name} [${exam.code}]`;
    
    // Aggiorna i dettagli dell'esame
    document.getElementById('exam-year').textContent = exam.year;
    document.getElementById('exam-status').textContent = exam.status;
    document.getElementById('exam-type').textContent = exam.examType;
    document.getElementById('exam-evaluation').textContent = exam.evaluationType;
    document.getElementById('exam-note').textContent = exam.note;
    document.getElementById('exam-frequency').textContent = exam.frequency;
    
    // Aggiorna la tabella delle unità didattiche
    const unitTableBody = document.getElementById('unit-table-body');
    unitTableBody.innerHTML = '';
    
    exam.units.forEach(unit => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${unit.name}</td>
            <td>${unit.type}</td>
            <td>${unit.formType}</td>
            <td>${unit.sector}</td>
            <td>${unit.cfu}</td>
            <td>${unit.duration}</td>
        `;
        unitTableBody.appendChild(row);
    });
}

// Inizializza la pagina quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se siamo nella pagina di login
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Non fare nulla, la pagina di login gestisce il proprio comportamento
    } else {
        // Verifica se l'utente è loggato per tutte le altre pagine
        checkLogin();
        
        // Aggiungi event listener per il logout
        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', logout);
        }
        
        // Aggiungi event listener per il menu mobile
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }
        
        // Aggiungi event listener per gli accordion
        const accordions = document.querySelectorAll('.accordion-header');
        if (accordions) {
            accordions.forEach(accordion => {
                accordion.addEventListener('click', function() {
                    toggleAccordion(this.parentElement);
                });
            });
        }
        
        // Aggiungi event listener per il filtro degli esami
        const filterSelect = document.getElementById('filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', filterExams);
        }
        
        // Aggiungi event listener per la ricerca degli esami
        const searchInput = document.getElementById('search');
        const searchButton = document.getElementById('search-button');
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', searchExams);
            searchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    searchExams();
                }
            });
        }
        
        // Se siamo nella pagina di dettaglio dell'esame, carica i dettagli
        if (window.location.pathname.includes('dettaglio-esame.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const examCode = urlParams.get('code');
            if (examCode) {
                loadExamDetails(examCode);
            } else {
                window.location.href = 'libretto.html';
            }
        }
    }
});

