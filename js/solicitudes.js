

var formularioHTML = `<form id="formulario" name="form" action="index.html#/solicitudes">
<legend>Datos</legend>
<br>
<label for="nombre" class="light">Nombre</label>
<input type="text" id="nombre" name="nombre">
<label for="email" class="light">Correo electrónico</label>
<input type="email" id="email" name="email">
<legend id="info">Siguiente</legend>
<br>
<div id="componentes" class="hidden">
  <label id="tituloLogotipo" for="logotipo" class="light">Logotipo</label>
  <input type="number" id="logotipo" name="logotipo" min="0">
  <label id="tituloPapeleria" for="papeleria" class="light">Papelería</label>
  <select id="papeleria" name="papeleria">
    <option value="">- Seleccionar -</option>
  </select>
  <label id="tituloEmpaque" for="empaque" class="light">Empaque</label>
  <select id="empaque" name="empaque">
    <option value="">- Seleccionar -</option>
  </select>
  <label id="tituloBranding" for="branding" class="light">Branding</label>
  <select id="branding" name="branding">
    <option value="">- Seleccionar -</option>
  </select>
  <button id="cotizar" class="custom-btn btn-3" type="submit">Cotizar</button>
  <br>
  <br>
  <button id="limpiar" formnovalidate class="custom-btn btn-2" type="submit" onclick="remover()">Limpiar</button>
  <br>
  <br>
</div><br>
<div id="presupuesto" class="resaltado hidden"></div>
<div id="indicacion">
  <hr>
  <h1 class="first">¡Acá se mostrará el resultado!</h1>
  <hr>
</div><br>
<div id="adicional" class="hidden">
</div>
</form>
`;
