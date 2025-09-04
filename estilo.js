
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('logiExpress');

    const jobInput = document.getElementById('job');
    const quantidadeInput = document.getElementById('quantidade');

    jobInput.addEventListener('input', () => {
        if (jobInput.value.length > 4) {
            jobInput.value = jobInput.value.slice(0, 4);
        }
    });

    quantidadeInput.addEventListener('input', () => {
        if (quantidadeInput.value.length > 3) {
            quantidadeInput.value = quantidadeInput.value.slice(0, 3);
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const formData = new FormData(form);
        const dados = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/salvar-remessa', { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(dados) 
            });

            const result = await response.json(); 

            alert(result.message);

            if (result.success) {
                form.reset(); 
            }

        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Falha na comunicação com o servidor. Tente novamente.');
        }
    });
});