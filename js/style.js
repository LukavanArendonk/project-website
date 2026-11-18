const form = document.getElementById('taak-form');
const input = document.getElementById('taak-input');
const lijst = document.getElementById('takenlijst');
const leegMelding = document.getElementById('leeg-melding');
const klok = document.getElementById('klok');

let taken = JSON.parse(localStorage.getItem('taken') || '[]');

const opslaan = () => localStorage.setItem('taken', JSON.stringify(taken));

function render() {
  lijst.innerHTML = '';

  taken.forEach((taak, index) => {
    const li = document.createElement('li');
    if (taak.klaar) li.classList.add('klaar');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = taak.klaar;
    checkbox.addEventListener('change', () => {
      taken[index].klaar = checkbox.checked;
      opslaan();
      render();
    });

    const span = document.createElement('span');
    span.textContent = taak.tekst;

    const verwijder = document.createElement('button');
    verwijder.textContent = '✕';
    verwijder.addEventListener('click', () => {
      taken.splice(index, 1);
      opslaan();
      render();
    });

    li.append(checkbox, span, verwijder);
    lijst.appendChild(li);
  });

  leegMelding.style.display = taken.length ? 'none' : 'block';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const tekst = input.value.trim();
  if (!tekst) return;
  taken.push({ tekst, klaar: false });
  input.value = '';
  opslaan();
  render();
});

function updateKlok() {
  klok.textContent = new Date().toLocaleTimeString('nl-NL');
}
updateKlok();
setInterval(updateKlok, 1000);

render();