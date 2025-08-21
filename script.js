const data = {
    functional: [
        { id: "RF1", req: "Autenticação de Usuário", desc: "O sistema deve permitir que os usuários se cadastrem com e-mail e senha e, posteriormente, se autentiquem para acessar o sistema.", status: "Implementado" },
        { id: "RF2", req: "Gestão de Tarefas (CRUD)", desc: "Os usuários devem poder criar, visualizar, editar e excluir tarefas.", status: "Implementado" },
        { id: "RF3", req: "Atributos da Tarefa", desc: "Cada tarefa deve possuir os seguintes atributos: título, descrição, status, progresso (0-100%), prioridade, data de criação, usuário responsável, cargo associado e cor de etiqueta.", status: "Implementado" },
        { id: "RF4", req: "Gestão de Cargos (CRUD)", desc: "O sistema deve permitir a criação, listagem, edição e exclusão de cargos, que podem ser associados a tarefas.", status: "Implementado" },
        { id: "RF5", req: "Visualização em Colunas (Kanban)", desc: "As tarefas devem ser exibidas em colunas que representam seus diferentes status, permitindo uma visualização no estilo Kanban.", status: "Implementado" },
        { id: "RF6", req: "Arrastar e Soltar (Drag-and-Drop)", desc: "Os usuários devem poder mover tarefas entre as colunas de status (arrastar e soltar), alterando seu status e ordem.", status: "Implementado" },
        { id: "RF7", req: "Filtros de Tarefas", desc: "A visualização de tarefas deve permitir a filtragem por status, prioridade e usuário responsável.", status: "Implementado" },
        { id: "RF8", req: "Gestão de Status", desc: "O sistema deve permitir adicionar, remover, editar e reordenar os status das tarefas, que são usados para criar as colunas do quadro Kanban.", status: "Implementado" },
        { id: "RF9", req: "Edição Rápida de Título", desc: "O título da tarefa deve ser editável diretamente no card da tarefa na visualização principal.", status: "Parcialmente Implementado" },
        { id: "RF10", req: "Personalização de Cor da Etiqueta", desc: "Os usuários devem poder selecionar uma cor personalizada para a etiqueta de cada tarefa.", status: "Implementado" },
        { id: "RF11", req: "Associação de Tarefa a Usuário e Cargo", desc: "Ao criar ou editar uma tarefa, deve ser possível associá-la a um usuário responsável e a um cargo.", status: "Implementado" },
        { id: "RF12", req: "Página Inicial", desc: "O sistema deve apresentar uma página inicial com informações gerais e links de navegação.", status: "Implementado" },
        { id: "RF13", req: "Modo Escuro", desc: "A interface deve oferecer um modo escuro para melhor visualização em ambientes com pouca luz.", status: "Parcialmente Implementado" },
        { id: "RF14", req: "Interface Responsiva", desc: "O sistema deve se adaptar a diferentes tamanhos de tela para garantir uma boa experiência em desktops e dispositivos móveis.", status: "Parcialmente Implementado" },
        { id: "RF15", req: "Gamificação", desc: "O sistema deve exibir o progresso do usuário com emblemas durante todo o tempo de uso, garantindo uma carreira rastreada para maior contribuição da equipe.", status: "Implementado" },
        { id: "RF16", req: "Tela de boas-vindas", desc: "Ao entrar na seção de tarefas, o sistema deve exibir uma tela de boas-vindas ao usuário, carregando em seguida a tela de tarefas.", status: "Implementado" }
    ],
    nonFunctional: [
        { id: "RNF1", req: "Usabilidade", desc: "A interface deve ser intuitiva e fácil de usar, com elementos visuais claros e feedback para as ações do usuário.", status: "Implementado" },
        { id: "RNF2", req: "Desempenho", desc: "As interações, como carregar tarefas, filtrar e arrastar, devem ser rápidas e fluidas, sem atrasos perceptíveis.", status: "Implementado" },
        { id: "RNF3", req: "Manutenibilidade", desc: "O código-fonte está organizado em uma estrutura padrão de projeto Spring Boot (MVC), com separação de responsabilidades, facilitando a manutenção e evolução do sistema.", status: "Implementado" },
        { id: "RNF4", req: "Segurança", desc: "A autenticação é baseada em credenciais armazenadas, embora a implementação de hashes de senha e HTTPS seja recomendada para um ambiente de produção.", status: "Parcialmente Implementado" },
        { id: "RNF5", req: "Persistência de Dados", desc: "Os dados de usuários, cargos, tarefas e status são persistidos em arquivos JSON, garantindo que as informações não sejam perdidas ao reiniciar o servidor.", status: "Implementado" },
        { id: "RNF6", req: "Flexibilidade", desc: "A gestão de status permite que os usuários adaptem os fluxos de trabalho às suas necessidades específicas.", status: "Implementado" },
        { id: "RNF7", req: "Compatibilidade", desc: "O projeto utiliza tecnologias web padrão (HTML, CSS, JavaScript) e frameworks populares (Spring Boot, Thymeleaf), garantindo alta compatibilidade com navegadores modernos.", status: "Implementado" }
    ],
    priorities: ["RF1", "RF2", "RF4", "RF5", "RF6", "RF7", "RNF1", "RNF2", "RNF5"]
};

const statusColors = {
    "Implementado": { bg: "bg-green-100", text: "text-green-800", border: "border-green-400", chart: "rgba(46, 204, 113, 0.7)" },
    "Parcialmente Implementado": { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-400", chart: "rgba(241, 196, 15, 0.7)" }
};

let statusGeralChart, statusDetalheChart;
let currentView = 'functional';

function getStatusCounts(reqs) {
    return reqs.reduce((acc, req) => {
        acc[req.status] = (acc[req.status] || 0) + 1;
        return acc;
    }, {});
}

function renderDashboard() {
    document.getElementById('total-rf').textContent = data.functional.length;
    document.getElementById('total-rnf').textContent = data.nonFunctional.length;

    const allReqs = [...data.functional, ...data.nonFunctional];
    const counts = getStatusCounts(allReqs);
    
    const ctx = document.getElementById('statusGeralChart').getContext('2d');
    if(statusGeralChart) statusGeralChart.destroy();
    statusGeralChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(counts),
            datasets: [{
                data: Object.values(counts),
                backgroundColor: Object.keys(counts).map(status => statusColors[status].chart),
                borderColor: '#FDFBF8',
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

function renderRequirements(type) {
    const reqs = data[type];
    const listElement = document.getElementById('requirements-list');
    listElement.innerHTML = '';

    reqs.forEach(req => {
        const color = statusColors[req.status];
        const card = `
            <div class="border-2 ${color.border} rounded-lg p-6 ${color.bg} flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <h4 class="text-xl font-bold text-gray-800">${req.id}</h4>
                        <span class="text-xs font-semibold px-3 py-1 ${color.bg} ${color.text} rounded-full border ${color.border}">${req.status.replace(' ', '\u00A0')}</span>
                    </div>
                    <h5 class="text-lg font-semibold text-gray-700 mb-2">${req.req}</h5>
                    <p class="text-base text-gray-600">${req.desc}</p>
                </div>
            </div>
        `;
        listElement.innerHTML += card;
    });

    updateDetalheChart(type);
}

function updateDetalheChart(type) {
    const reqs = data[type];
    const counts = getStatusCounts(reqs);
    const labels = Object.keys(counts);
    const chartData = Object.values(counts);

    if (statusDetalheChart) {
        statusDetalheChart.destroy();
    }

    const ctx = document.getElementById('statusDetalheChart').getContext('2d');
    statusDetalheChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map(label => label.split(' ')),
            datasets: [{
                label: 'Contagem de Status',
                data: chartData,
                backgroundColor: labels.map(status => statusColors[status].chart),
                borderColor: labels.map(status => statusColors[status].chart.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderPriorities() {
    const listElement = document.getElementById('priority-list');
    const allReqs = [...data.functional, ...data.nonFunctional];
    listElement.innerHTML = '';
    data.priorities.forEach(pId => {
        const req = allReqs.find(r => r.id === pId);
        if (req) {
            const item = `
                <li class="flex items-center space-x-3">
                    <span class="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">${req.id.replace('R','')}</span>
                    <span class="text-gray-700">${req.req}</span>
                </li>
            `;
            listElement.innerHTML += item;
        }
    });
}

let currentSlide = 0;
const slidesContainer = document.getElementById('slides-container');
const totalSlides = document.querySelectorAll('.slide').length;
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateSlide() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
    prevBtn.classList.toggle('cursor-not-allowed', prevBtn.disabled);
    nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
    nextBtn.classList.toggle('cursor-not-allowed', nextBtn.disabled);
}

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextBtn.click();
    } else if (event.key === 'ArrowLeft') {
        prevBtn.click();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderRequirements(currentView);
    renderPriorities();
    updateSlide();

    const btnRf = document.getElementById('btn-rf');
    const btnRnf = document.getElementById('btn-rnf');

    btnRf.addEventListener('click', () => {
        currentView = 'functional';
        btnRf.classList.add('border-[#3498DB]', 'text-[#3498DB]');
        btnRf.classList.remove('border-transparent', 'text-gray-500');
        btnRnf.classList.add('border-transparent', 'text-gray-500');
        btnRnf.classList.remove('border-[#3498DB]', 'text-[#3498DB]');
        renderRequirements(currentView);
    });

    btnRnf.addEventListener('click', () => {
        currentView = 'nonFunctional';
        btnRnf.classList.add('border-[#3498DB]', 'text-[#3498DB]');
        btnRnf.classList.remove('border-transparent', 'text-gray-500');
        btnRf.classList.add('border-transparent', 'text-gray-500');
        btnRf.classList.remove('border-[#3498DB]', 'text-[#3498DB]');
        renderRequirements(currentView);
    });
});
