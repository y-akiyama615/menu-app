const addForm = document.getElementById('addForm');
const menusDiv = document.getElementById('menus');

let menus = JSON.parse(localStorage.getItem('menus')) || [];

function renderMenus() {
  menusDiv.innerHTML = '';
  menus.forEach((menu, index) => {
    const card = document.createElement('div');
    card.className = 'menu-card';

    const img = document.createElement('img');
    img.src = menu.image || 'https://via.placeholder.com/200x150?text=No+Image';
    card.appendChild(img);

    const content = document.createElement('div');
    content.className = 'content';

    content.innerHTML = `
      <h3>${menu.name}</h3>
      <div class="price">?${menu.price}</div>
      <div class="category">${menu.category}</div>
      ${menu.note ? `<div class="note">${menu.note}</div>` : ''}
      <button onclick="deleteMenu(${index})">çÌèú</button>
    `;

    card.appendChild(content);
    menusDiv.appendChild(card);
  });
}

function deleteMenu(index) {
  if (confirm('Ç±ÇÃÉÅÉjÉÖÅ[ÇçÌèúÇµÇ‹Ç∑Ç©ÅH')) {
    menus.splice(index, 1);
    localStorage.setItem('menus', JSON.stringify(menus));
    renderMenus();
  }
}

addForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;
  const note = document.getElementById('note').value;
  const imageInput = document.getElementById('image');
  const file = imageInput.files[0];

  const reader = new FileReader();
  reader.onload = function() {
    const imageUrl = reader.result;

    const menu = { name, price, category, note, image: imageUrl };
    menus.push(menu);
    localStorage.setItem('menus', JSON.stringify(menus));
    renderMenus();
    addForm.reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    const menu = { name, price, category, note, image: '' };
    menus.push(menu);
    localStorage.setItem('menus', JSON.stringify(menus));
    renderMenus();
    addForm.reset();
  }
});

renderMenus();