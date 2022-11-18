export class Vehiculo {
  id = "";
  modelo = "";
  anoFab = "";
  velMax = "";

  constructor(id, modelo, anoFab, velMax) {
    this.id = id;
    this.modelo = modelo;
    this.anoFab = anoFab;
    this.velMax = velMax;
  }
  get Id() {
    return this.id;
  }

  set Id(value) {
    if (value == null || value < 1) {
    }
    this.id = value;
  }

  get Modelo() {
    return this.modelo;
  }

  set Modelo(value) {
    if (value == null || value.length < 2) {
    }
    this.modelo = value;
  }

  get AnoFab() {
    return this.anoFab;
  }

  set AnoFab(value) {
    this.anoFab = value;
  }
  get VelMax() {
    return this.velMax;
  }

  set VelMax(value) {
    this.velMax = value;
  }
}

export class Aereo extends Vehiculo {
  altMax = "N/A";
  autonomia = "N/A";

  constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
    super(id, modelo, anoFab, velMax);

    this.altMax = altMax;
    this.autonomia = autonomia;
  }
  get AltMax() {
    return this.altMax;
  }

  set AltMax(value) {
    this.altMax = value;
  }
  get Autonomia() {
    return this.autonomia;
  }

  set Autonomia(value) {
    this.autonomia = value;
  }
}

export class Terrestre extends Vehiculo {
  cantPue = "N/A";
  cantRue = "N/A";
  constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
    super(id, modelo, anoFab, velMax);
    this.cantPue = cantPue;
    this.cantRue = cantRue;
  }
  get CantPue() {
    return this.cantPue;
  }

  set CantPue(value) {
    this.cantPue = value;
  }
  get CantRue() {
    return this.cantRue;
  }

  set CantRue(value) {
    this.cantRue = value;
  }
}
