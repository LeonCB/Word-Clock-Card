/* ==========================================================================
   Word Clock Card — a QLOCKTWO-style multilingual word clock for
   Home Assistant Lovelace dashboards.

   Install:
   1. Copy this file to <config>/www/word-clock-card.js
      (e.g. via Settings > Add-ons > File editor, or Samba/SSH)
   2. Settings > Dashboards > (⋮) > Resources > Add resource
        URL: /local/word-clock-card.js
        Resource type: JavaScript module
   3. Edit a dashboard > Add card > search "Word Clock"
      (or add manually: type: custom:word-clock-card)
   4. Configure language / background / text color in the card's own
      visual editor — no YAML required.
   ========================================================================== */
(function () {
  'use strict';

const LANGS = {};

/* ---------------- NEDERLANDS ---------------- */
LANGS.nl = {
  label: 'NL',
  rows: [
    "HETKISAVIJF",
    "TIENATZVOOR",
    "OVERMEKWART",
    "HALFSPMOVER",
    "VOORTHG\u00c9\u00c9NS",
    "TWEEAMCDRIE",
    "VIERVIJFZES",
    "ZEVENONEGEN",
    "ACHTTIENELF",
    "TWAALFPMUUR"
  ],
  seg: {
    HET:[0,0,2], IS:[0,4,5], MIN_VIJF:[0,7,10],
    MIN_TIEN:[1,0,3], VOOR_DIR:[1,7,10],
    OVER_DIR:[2,0,3], KWART:[2,6,10],
    HALF:[3,0,3], OVER_HALF:[3,7,10],
    VOOR_HALF:[4,0,3], EEN:[4,7,9],
    TWEE:[5,0,3], DRIE:[5,7,10],
    VIER:[6,0,3], VIJF_H:[6,4,7], ZES:[6,8,10],
    ZEVEN:[7,0,4], NEGEN:[7,6,10],
    ACHT:[8,0,3], TIEN_H:[8,4,7], ELF:[8,8,10],
    TWAALF:[9,0,5], UUR:[9,8,10]
  },
  hourWord: {1:'EEN',2:'TWEE',3:'DRIE',4:'VIER',5:'VIJF_H',6:'ZES',7:'ZEVEN',8:'ACHT',9:'NEGEN',10:'TIEN_H',11:'ELF',12:'TWAALF'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const segs = ['HET','IS'];
    switch(block){
      case 0: segs.push(this.hourWord[h12], 'UUR'); break;
      case 1: segs.push('MIN_VIJF','OVER_DIR', this.hourWord[h12]); break;
      case 2: segs.push('MIN_TIEN','OVER_DIR', this.hourWord[h12]); break;
      case 3: segs.push('KWART','OVER_HALF', this.hourWord[h12]); break;
      case 4: segs.push('MIN_TIEN','VOOR_DIR','HALF', this.hourWord[next]); break;
      case 5: segs.push('MIN_VIJF','VOOR_DIR','HALF', this.hourWord[next]); break;
      case 6: segs.push('HALF', this.hourWord[next]); break;
      case 7: segs.push('MIN_VIJF','OVER_DIR','HALF', this.hourWord[next]); break;
      case 8: segs.push('MIN_TIEN','OVER_DIR','HALF', this.hourWord[next]); break;
      case 9: segs.push('KWART','VOOR_HALF', this.hourWord[next]); break;
      case 10: segs.push('MIN_TIEN','VOOR_DIR', this.hourWord[next]); break;
      case 11: segs.push('MIN_VIJF','VOOR_DIR', this.hourWord[next]); break;
    }
    return segs;
  }
};

/* ---------------- ENGLISH ---------------- */
LANGS.en = {
  label: 'EN',
  rows: [
    "ITLISASAMPM",
    "ACQUARTERDC",
    "TWENTYFIVEX",
    "HALFSTENFTO",
    "PASTERUNINE",
    "ONESIXTHREE",
    "FOURFIVETWO",
    "EIGHTELEVEN",
    "SEVENTWELVE",
    "TENSEOCLOCK"
  ],
  seg: {
    IT:[0,0,1], IS:[0,3,4],
    A_QUARTER:[1,0,0], QUARTER:[1,2,8],
    TWENTY:[2,0,5], MIN_FIVE:[2,6,9],
    HALF:[3,0,3], MIN_TEN:[3,5,7], TO:[3,9,10],
    PAST:[4,0,3], NINE:[4,7,10],
    ONE:[5,0,2], SIX:[5,3,5], THREE:[5,6,10],
    FOUR:[6,0,3], FIVE_H:[6,4,7], TWO:[6,8,10],
    EIGHT:[7,0,4], ELEVEN:[7,5,10],
    SEVEN:[8,0,4], TWELVE:[8,5,10],
    TEN_H:[9,0,2], OCLOCK:[9,5,10]
  },
  hourWord: {1:'ONE',2:'TWO',3:'THREE',4:'FOUR',5:'FIVE_H',6:'SIX',7:'SEVEN',8:'EIGHT',9:'NINE',10:'TEN_H',11:'ELEVEN',12:'TWELVE'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const segs = ['IT','IS'];
    switch(block){
      case 0: segs.push(this.hourWord[h12], 'OCLOCK'); break;
      case 1: segs.push('MIN_FIVE','PAST', this.hourWord[h12]); break;
      case 2: segs.push('MIN_TEN','PAST', this.hourWord[h12]); break;
      case 3: segs.push('A_QUARTER','QUARTER','PAST', this.hourWord[h12]); break;
      case 4: segs.push('TWENTY','PAST', this.hourWord[h12]); break;
      case 5: segs.push('TWENTY','MIN_FIVE','PAST', this.hourWord[h12]); break;
      case 6: segs.push('HALF','PAST', this.hourWord[h12]); break;
      case 7: segs.push('TWENTY','MIN_FIVE','TO', this.hourWord[next]); break;
      case 8: segs.push('TWENTY','TO', this.hourWord[next]); break;
      case 9: segs.push('A_QUARTER','QUARTER','TO', this.hourWord[next]); break;
      case 10: segs.push('MIN_TEN','TO', this.hourWord[next]); break;
      case 11: segs.push('MIN_FIVE','TO', this.hourWord[next]); break;
    }
    return segs;
  }
};

/* ---------------- DEUTSCH ---------------- */
LANGS.de = {
  label: 'DE',
  rows: [
    "ESKISTAF\u00dcNF",
    "ZEHNZWANZIG",
    "DREIVIERTEL",
    "VORFUNKNACH",
    "HALBAELF\u00dcNF",
    "EINSXAMZWEI",
    "DREIPMJVIER",
    "SECHSNLACHT",
    "SIEBENZW\u00d6LF",
    "ZEHNEUNKUHR"
  ],
  seg: {
    ES:[0,0,1], IST:[0,3,5], MIN_FUENF:[0,7,10],
    MIN_ZEHN:[1,0,3], ZWANZIG:[1,4,10],
    VIERTEL:[2,4,10],
    VOR:[3,0,2], NACH:[3,7,10],
    HALB:[4,0,3], ELF:[4,5,7], FUENF_H:[4,7,10],
    EINS:[5,0,3], ZWEI:[5,7,10],
    DREI_H:[6,0,3], VIER_H:[6,7,10],
    SECHS:[7,0,4], ACHT:[7,7,10],
    SIEBEN:[8,0,5], ZWOELF:[8,6,10],
    ZEHN_H:[9,0,3], NEUN:[9,3,6], UHR:[9,8,10]
  },
  hourWord: {1:'EINS',2:'ZWEI',3:'DREI_H',4:'VIER_H',5:'FUENF_H',6:'SECHS',7:'SIEBEN',8:'ACHT',9:'NEUN',10:'ZEHN_H',11:'ELF',12:'ZWOELF'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const segs = ['ES','IST'];
    switch(block){
      case 0: segs.push(this.hourWord[h12], 'UHR'); break;
      case 1: segs.push('MIN_FUENF','NACH', this.hourWord[h12]); break;
      case 2: segs.push('MIN_ZEHN','NACH', this.hourWord[h12]); break;
      case 3: segs.push('VIERTEL','NACH', this.hourWord[h12]); break;
      case 4: segs.push('ZWANZIG','NACH', this.hourWord[h12]); break;
      case 5: segs.push('MIN_FUENF','VOR','HALB', this.hourWord[next]); break;
      case 6: segs.push('HALB', this.hourWord[next]); break;
      case 7: segs.push('MIN_FUENF','NACH','HALB', this.hourWord[next]); break;
      case 8: segs.push('ZWANZIG','VOR', this.hourWord[next]); break;
      case 9: segs.push('VIERTEL','VOR', this.hourWord[next]); break;
      case 10: segs.push('MIN_ZEHN','VOR', this.hourWord[next]); break;
      case 11: segs.push('MIN_FUENF','VOR', this.hourWord[next]); break;
    }
    return segs;
  }
};

/* ---------------- FRAN\u00c7AIS ---------------- */
LANGS.fr = {
  label: 'FR',
  rows: [
    "ILNESTODEUX",
    "QUATRETROIS",
    "NEUFUNESEPT",
    "HUITSIXCINQ",
    "MIDIXMINUIT",
    "ONZERHEURES",
    "MOINSOLEDIX",
    "ETRQUARTPMD",
    "VINGT-CINQU",
    "ETSDEMIEPAM"
  ],
  seg: {
    IL:[0,0,1], EST:[0,3,5], DEUX:[0,7,10],
    QUATRE:[1,0,5], TROIS:[1,6,10],
    NEUF:[2,0,3], UNE:[2,4,6], SEPT:[2,7,10],
    HUIT:[3,0,3], SIX:[3,4,6], CINQ_H:[3,7,10],
    MIDI:[4,0,3], DIX_H:[4,2,4], MINUIT:[4,5,10],
    ONZE:[5,0,3], HEURES:[5,5,10],
    MOINS:[6,0,4], LE:[6,6,7], DIX_MIN:[6,8,10],
    ET_Q:[7,0,1], QUART:[7,3,7],
    VINGT:[8,0,4], TIRET:[8,5,5], CINQ_MIN:[8,6,9],
    ET_D:[9,0,1], DEMIE:[9,3,7]
  },
  hourWord: {1:'UNE',2:'DEUX',3:'TROIS',4:'QUATRE',5:'CINQ_H',6:'SIX',7:'SEPT',8:'HUIT',9:'NEUF',10:'DIX_H',11:'ONZE'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const dh = block<=6 ? h12 : next;
    const dhHour24 = block<=6 ? hour24 : (hour24+1)%24;
    const segs = ['IL','EST'];
    if (dh===12){
      segs.push(dhHour24===12 ? 'MIDI' : 'MINUIT');
    } else {
      segs.push(this.hourWord[dh], 'HEURES');
    }
    switch(block){
      case 1: segs.push('CINQ_MIN'); break;
      case 2: segs.push('DIX_MIN'); break;
      case 3: segs.push('ET_Q','QUART'); break;
      case 4: segs.push('VINGT'); break;
      case 5: segs.push('VINGT','TIRET','CINQ_MIN'); break;
      case 6: segs.push('ET_D','DEMIE'); break;
      case 7: segs.push('MOINS','VINGT','TIRET','CINQ_MIN'); break;
      case 8: segs.push('MOINS','VINGT'); break;
      case 9: segs.push('MOINS','LE','QUART'); break;
      case 10: segs.push('MOINS','DIX_MIN'); break;
      case 11: segs.push('MOINS','CINQ_MIN'); break;
    }
    return segs;
  }
};

/* ---------------- ITALIANO (officieel QLOCKTWO-raster) ---------------- */
LANGS.it = {
  label: 'IT',
  rows: [
    "SONORLEBORE",
    "\u00c8RLUNASDUEZ",
    "TREOTTONOVE",
    "DIECIUNDICI",
    "DODICISETTE",
    "QUATTROCSEI",
    "CINQUEAMENO",
    "ECUNOQUARTO",
    "VENTICINQUE",
    "DIECIPMEZZA"
  ],
  seg: {
    SONO:[0,0,3], LE:[0,5,6],
    E_ACC:[1,0,0], LUNA:[1,2,5], DUE:[1,7,9],
    TRE:[2,0,2], OTTO:[2,3,6], NOVE:[2,7,10],
    DIECI_H:[3,0,4], UNDICI:[3,5,10],
    DODICI:[4,0,5], SETTE:[4,6,10],
    QUATTRO:[5,0,6], SEI:[5,8,10],
    CINQUE_H:[6,0,5], MENO:[6,7,10],
    E:[7,0,0], UN:[7,2,3], QUARTO:[7,5,10],
    VENTI:[8,0,4], CINQUE_MIN:[8,5,10],
    DIECI_MIN:[9,0,4], MEZZA:[9,6,10]
  },
  hourWord: {2:'DUE',3:'TRE',4:'QUATTRO',5:'CINQUE_H',6:'SEI',7:'SETTE',8:'OTTO',9:'NOVE',10:'DIECI_H',11:'UNDICI',12:'DODICI'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const dh = block<=6 ? h12 : next;
    const segs = [];
    if (dh===1){ segs.push('E_ACC','LUNA'); } else { segs.push('SONO','LE', this.hourWord[dh]); }
    switch(block){
      case 1: segs.push('E','CINQUE_MIN'); break;
      case 2: segs.push('E','DIECI_MIN'); break;
      case 3: segs.push('E','UN','QUARTO'); break;
      case 4: segs.push('E','VENTI'); break;
      case 5: segs.push('E','VENTI','CINQUE_MIN'); break;
      case 6: segs.push('E','MEZZA'); break;
      case 7: segs.push('MENO','VENTI','CINQUE_MIN'); break;
      case 8: segs.push('MENO','VENTI'); break;
      case 9: segs.push('MENO','UN','QUARTO'); break;
      case 10: segs.push('MENO','DIECI_MIN'); break;
      case 11: segs.push('MENO','CINQUE_MIN'); break;
    }
    return segs;
  }
};

/* ---------------- ESPA\u00d1OL (officieel QLOCKTWO-raster) ---------------- */
LANGS.es = {
  label: 'ES',
  rows: [
    "ESONELASUNA",
    "DOSITRESOAM",
    "CUATROCINCO",
    "SEISASIETEN",
    "OCHONUEVEPM",
    "LADIEZSONCE",
    "DOCELYMENOS",
    "OVEINTEDIEZ",
    "VEINTICINCO",
    "MEDIACUARTO"
  ],
  seg: {
    ES:[0,0,1], SON:[0,1,3], LA:[0,5,6], LAS:[0,5,7], UNA:[0,8,10],
    DOS:[1,0,2], TRES:[1,4,7],
    CUATRO:[2,0,5], CINCO_H:[2,6,10],
    SEIS:[3,0,3], SIETE:[3,5,9],
    OCHO:[4,0,3], NUEVE:[4,4,8],
    DIEZ_H:[5,2,5], ONCE:[5,7,10],
    DOCE:[6,0,3], Y:[6,5,5], MENOS:[6,6,10],
    VEINTE:[7,1,6], DIEZ_MIN:[7,7,10],
    VEINTI:[8,0,5], CINCO_MIN:[8,6,10],
    MEDIA:[9,0,4], CUARTO:[9,5,10]
  },
  hourWord: {2:'DOS',3:'TRES',4:'CUATRO',5:'CINCO_H',6:'SEIS',7:'SIETE',8:'OCHO',9:'NUEVE',10:'DIEZ_H',11:'ONCE',12:'DOCE'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const dh = block<=6 ? h12 : next;
    const segs = [];
    if (dh===1){ segs.push('ES','LA','UNA'); } else { segs.push('SON','LAS', this.hourWord[dh]); }
    switch(block){
      case 1: segs.push('Y','CINCO_MIN'); break;
      case 2: segs.push('Y','DIEZ_MIN'); break;
      case 3: segs.push('Y','CUARTO'); break;
      case 4: segs.push('Y','VEINTE'); break;
      case 5: segs.push('Y','VEINTI','CINCO_MIN'); break;
      case 6: segs.push('Y','MEDIA'); break;
      case 7: segs.push('MENOS','VEINTI','CINCO_MIN'); break;
      case 8: segs.push('MENOS','VEINTE'); break;
      case 9: segs.push('MENOS','CUARTO'); break;
      case 10: segs.push('MENOS','DIEZ_MIN'); break;
      case 11: segs.push('MENOS','CINCO_MIN'); break;
    }
    return segs;
  }
};

/* ---------------- ΕΛΛΗΝΙΚΑ (officieel QLOCKTWO-raster) ---------------- */
LANGS.el = {
  label: 'EL',
  rows: [
    "\u0397\u03a7\u03a9\u03a1\u0391\u03a4\u0395\u0399\u039d\u0391\u0399",
    "\u039c\u0399\u0391\u0394\u03a5\u039f\u03a4\u03a1\u0395\u0399\u03a3",
    "\u03a4\u0395\u03a3\u03a3\u0395\u03a1\u0399\u03a3\u0395\u039e\u0399",
    "\u03a0\u0395\u039d\u03a4\u0395\u03a1\u039f\u03a7\u03a4\u03a9\u0397",
    "\u0395\u03a6\u03a4\u0391\u0395\u0395\u039d\u03a4\u0395\u039a\u0391",
    "\u0394\u03a9\u0394\u0395\u039a\u0391\u0395\u039d\u039d\u0399\u0391",
    "\u0394\u0395\u039a\u0391\u03a7\u03a0\u0391\u03a1\u0391\u0395\u03a1",
    "\u039a\u0391\u0399\u0395\u03a4\u0395\u03a4\u0391\u03a1\u03a4\u039f",
    "\u0395\u0399\u039a\u039f\u03a3\u0399\u0397\u0394\u0395\u039a\u0391",
    "\u039c\u0399\u03a3\u0397\u0395\u03a0\u0395\u039d\u03a4\u0395\u03a1"
  ],
  seg: {
    H:[0,0,0], ORA:[0,2,4], EINAI:[0,6,10],
    MIA:[1,0,2], DYO:[1,3,5], TREIS:[1,6,10],
    TESSERIS:[2,0,7], EXI:[2,8,10],
    PENTE_H:[3,0,4], OXTO:[3,6,9],
    EFTA:[4,0,3], ENTEKA:[4,5,10],
    DODEKA:[5,0,5], ENNIA:[5,6,10],
    DEKA_H:[6,0,3], PARA:[6,5,8],
    KAI:[7,0,2], TETARTO:[7,4,10],
    EIKOSI:[8,0,5], DEKA_MIN:[8,7,10],
    MISI:[9,0,3], PENTE_MIN:[9,5,9]
  },
  hourWord: {1:'MIA',2:'DYO',3:'TREIS',4:'TESSERIS',5:'PENTE_H',6:'EXI',7:'EFTA',8:'OXTO',9:'ENNIA',10:'DEKA_H',11:'ENTEKA',12:'DODEKA'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const dh = block<=6 ? h12 : next;
    const segs = ['H','ORA','EINAI', this.hourWord[dh]];
    switch(block){
      case 1: segs.push('KAI','PENTE_MIN'); break;
      case 2: segs.push('KAI','DEKA_MIN'); break;
      case 3: segs.push('KAI','TETARTO'); break;
      case 4: segs.push('KAI','EIKOSI'); break;
      case 5: segs.push('KAI','EIKOSI','PENTE_MIN'); break;
      case 6: segs.push('KAI','MISI'); break;
      case 7: segs.push('PARA','EIKOSI','PENTE_MIN'); break;
      case 8: segs.push('PARA','EIKOSI'); break;
      case 9: segs.push('PARA','TETARTO'); break;
      case 10: segs.push('PARA','DEKA_MIN'); break;
      case 11: segs.push('PARA','PENTE_MIN'); break;
    }
    return segs;
  }
};

/* ---------------- DANSK (officieel QLOCKTWO-raster) ---------------- */
LANGS.da = {
  label: 'DA',
  rows: [
    "KLOKKENVERO",
    "FEMTYVESKAM",
    "OJEKVARTVAT",
    "TIAMINUTTER",
    "VEMOVERILPM",
    "MONALISHALV",
    "ETTOTREFIRE",
    "FEMSEKSRSYV",
    "OTTERNIMETI",
    "ELLEVEATOLV"
  ],
  seg: {
    KLOKKEN:[0,0,6], ER:[0,8,9],
    FEM_MIN:[1,0,2], TYVE:[1,3,6],
    KVART:[2,3,7],
    TI_MIN:[3,0,1],
    OVER:[4,3,6], I:[4,7,7],
    HALV:[5,7,10],
    ET:[6,0,1], TO:[6,2,3], TRE:[6,4,6], FIRE:[6,7,10],
    FEM_H:[7,0,2], SEKS:[7,3,6], SYV:[7,8,10],
    OTTE:[8,0,3], NI:[8,5,6], TI_H:[8,9,10],
    ELLEVE:[9,0,5], TOLV:[9,7,10]
  },
  hourWord: {1:'ET',2:'TO',3:'TRE',4:'FIRE',5:'FEM_H',6:'SEKS',7:'SYV',8:'OTTE',9:'NI',10:'TI_H',11:'ELLEVE',12:'TOLV'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const segs = ['KLOKKEN','ER'];
    switch(block){
      case 0: segs.push(this.hourWord[h12]); break;
      case 1: segs.push('FEM_MIN','OVER', this.hourWord[h12]); break;
      case 2: segs.push('TI_MIN','OVER', this.hourWord[h12]); break;
      case 3: segs.push('KVART','OVER', this.hourWord[h12]); break;
      case 4: segs.push('TI_MIN','I','HALV', this.hourWord[next]); break;
      case 5: segs.push('FEM_MIN','I','HALV', this.hourWord[next]); break;
      case 6: segs.push('HALV', this.hourWord[next]); break;
      case 7: segs.push('FEM_MIN','OVER','HALV', this.hourWord[next]); break;
      case 8: segs.push('TI_MIN','OVER','HALV', this.hourWord[next]); break;
      case 9: segs.push('KVART','I', this.hourWord[next]); break;
      case 10: segs.push('TI_MIN','I', this.hourWord[next]); break;
      case 11: segs.push('FEM_MIN','I', this.hourWord[next]); break;
    }
    return segs;
  }
};

/* ---------------- SVENSKA (officieel QLOCKTWO-raster) ---------------- */
LANGS.sv = {
  label: 'SV',
  rows: [
    "KLOCKANT\u00c4RK",
    "FEMYISTIONI",
    "KVARTQIENZO",
    "TJUGOLIVIPM",
    "\u00d6VERKAMHALV",
    "ETTUSVLXTV\u00c5",
    "TREMYKYFYRA",
    "FEMSFLORSEX",
    "SJU\u00c5TTAINIO",
    "TIOELVATOLV"
  ],
  seg: {
    KLOCKAN:[0,0,6], AR:[0,8,9],
    FEM_MIN:[1,0,2], TIO_MIN:[1,6,8],
    KVART:[2,0,4],
    TJUGO:[3,0,4], I:[3,6,6],
    OVER:[4,0,3], HALV:[4,7,10],
    ETT:[5,0,2], TVA:[5,8,10],
    TRE:[6,0,2], FYRA:[6,7,10],
    FEM_H:[7,0,2], SEX:[7,8,10],
    SJU:[8,0,2], ATTA:[8,3,6], NIO:[8,8,10],
    TIO_H:[9,0,2], ELVA:[9,3,6], TOLV:[9,7,10]
  },
  hourWord: {1:'ETT',2:'TVA',3:'TRE',4:'FYRA',5:'FEM_H',6:'SEX',7:'SJU',8:'ATTA',9:'NIO',10:'TIO_H',11:'ELVA',12:'TOLV'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const segs = ['KLOCKAN','AR'];
    switch(block){
      case 0: segs.push(this.hourWord[h12]); break;
      case 1: segs.push('FEM_MIN','OVER', this.hourWord[h12]); break;
      case 2: segs.push('TIO_MIN','OVER', this.hourWord[h12]); break;
      case 3: segs.push('KVART','OVER', this.hourWord[h12]); break;
      case 4: segs.push('TJUGO','OVER', this.hourWord[h12]); break;
      case 5: segs.push('FEM_MIN','I','HALV', this.hourWord[next]); break;
      case 6: segs.push('HALV', this.hourWord[next]); break;
      case 7: segs.push('FEM_MIN','OVER','HALV', this.hourWord[next]); break;
      case 8: segs.push('TJUGO','I', this.hourWord[next]); break;
      case 9: segs.push('KVART','I', this.hourWord[next]); break;
      case 10: segs.push('TIO_MIN','I', this.hourWord[next]); break;
      case 11: segs.push('FEM_MIN','I', this.hourWord[next]); break;
    }
    return segs;
  }
};

/* ---------------- NORSK (officieel QLOCKTWO-raster) ---------------- */
LANGS.no = {
  label: 'NO',
  rows: [
    "KLOKKENVERM",
    "FEMHP\u00c5SUFIS",
    "TILP\u00c5SIDOSN",
    "KVARTNP\u00c5STO",
    "OVERXAMBPMZ",
    "HALVBIEGENZ",
    "ETTNTOATREX",
    "FIREFEMSEKS",
    "SYV\u00c5TTENITI",
    "ELLEVESTOLV"
  ],
  seg: {
    KLOKKEN:[0,0,6], ER:[0,8,9],
    FEM_MIN:[1,0,2],
    TI_MIN:[2,0,1],
    KVART:[3,0,4], PA:[3,6,7],
    OVER:[4,0,3],
    HALV:[5,0,3],
    ETT:[6,0,2], TO:[6,4,5], TRE:[6,7,9],
    FIRE:[7,0,3], FEM_H:[7,4,6], SEKS:[7,7,10],
    SYV:[8,0,2], ATTE:[8,3,6], NI:[8,7,8], TI_H:[8,9,10],
    ELLEVE:[9,0,5], TOLV:[9,7,10]
  },
  hourWord: {1:'ETT',2:'TO',3:'TRE',4:'FIRE',5:'FEM_H',6:'SEKS',7:'SYV',8:'ATTE',9:'NI',10:'TI_H',11:'ELLEVE',12:'TOLV'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const segs = ['KLOKKEN','ER'];
    switch(block){
      case 0: segs.push(this.hourWord[h12]); break;
      case 1: segs.push('FEM_MIN','OVER', this.hourWord[h12]); break;
      case 2: segs.push('TI_MIN','OVER', this.hourWord[h12]); break;
      case 3: segs.push('KVART','OVER', this.hourWord[h12]); break;
      case 4: segs.push('TI_MIN','PA','HALV', this.hourWord[next]); break;
      case 5: segs.push('FEM_MIN','PA','HALV', this.hourWord[next]); break;
      case 6: segs.push('HALV', this.hourWord[next]); break;
      case 7: segs.push('FEM_MIN','OVER','HALV', this.hourWord[next]); break;
      case 8: segs.push('TI_MIN','OVER','HALV', this.hourWord[next]); break;
      case 9: segs.push('KVART','PA', this.hourWord[next]); break;
      case 10: segs.push('TI_MIN','PA', this.hourWord[next]); break;
      case 11: segs.push('FEM_MIN','PA', this.hourWord[next]); break;
    }
    return segs;
  }
};

/* ---------------- ROM\u00c2N\u0102 (officieel QLOCKTWO-raster) ---------------- */
LANGS.ro = {
  label: 'RO',
  rows: [
    "ESTEZORAPMO",
    "DOU\u0102NSPREAM",
    "UNSPREZECEL",
    "NOU\u0102OPT\u0218ASE",
    "PATRUNUTREI",
    "\u0218APTECINCIA",
    "\u0218IBTREIZECI",
    "F\u0102R\u0102OZECEUN",
    "DOU\u0102ZECIV\u0218I",
    "CINCIUSFERT"
  ],
  seg: {
    ESTE:[0,0,3], ORA:[0,5,7],
    DOUA:[1,0,3],
    UNSPREZECE:[2,0,9], SPREZECE:[2,2,9], UN_H:[2,0,1], ZECE_H:[2,6,9],
    NOUA:[3,0,3], OPT:[3,4,6], SASE:[3,7,10],
    PATRU:[4,0,4], TREI:[4,7,10],
    SAPTE:[5,0,4], CINCI_H:[5,5,9],
    SI1:[6,0,1], TREIZECI:[6,3,10],
    FARA:[7,0,3], ZECE:[7,5,8], UN:[7,9,10],
    DOUAZECI:[8,0,7], SI2:[8,9,10],
    CINCI_MIN:[9,0,4], SFERT:[9,6,10]
  },
  hourWord: {1:'UN_H',2:'DOUA',3:'TREI',4:'PATRU',5:'CINCI_H',6:'SASE',7:'SAPTE',8:'OPT',9:'NOUA',10:'ZECE_H',11:'UNSPREZECE'},
  build(hour24, minute){
    const block = Math.floor(minute/5);
    const h12 = (hour24%12)||12;
    const next = (h12%12)+1;
    const dh = block<=6 ? h12 : next;
    const segs = ['ESTE','ORA'];
    if (dh===12){ segs.push('DOUA','SPREZECE'); } else { segs.push(this.hourWord[dh]); }
    switch(block){
      case 1: segs.push('SI1','CINCI_MIN'); break;
      case 2: segs.push('SI1','ZECE'); break;
      case 3: segs.push('SI1','UN','SFERT'); break;
      case 4: segs.push('SI1','DOUAZECI'); break;
      case 5: segs.push('SI1','DOUAZECI','SI2','CINCI_MIN'); break;
      case 6: segs.push('SI1','TREIZECI'); break;
      case 7: segs.push('FARA','DOUAZECI','SI2','CINCI_MIN'); break;
      case 8: segs.push('FARA','DOUAZECI'); break;
      case 9: segs.push('FARA','UN','SFERT'); break;
      case 10: segs.push('FARA','ZECE'); break;
      case 11: segs.push('FARA','CINCI_MIN'); break;
    }
    return segs;
  }
};

/* ============================================================ */

  const LANG_NAMES = {
    nl: 'Nederlands', en: 'Engels', de: 'Duits', fr: 'Frans',
    it: 'Italiaans', es: 'Spaans', el: 'Grieks', da: 'Deens',
    sv: 'Zweeds', no: 'Noors', ro: 'Roemeens'
  };

  const DEFAULT_BG = '#101113';
  const DEFAULT_TEXT = '#ffffff';

  /* ---------------- kleurhulpjes ---------------- */
  function clamp(n){ return Math.max(0, Math.min(255, n)); }
  function hexToRgb(hex){
    let h = (hex || '').replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (!/^[0-9a-fA-F]{6}$/.test(h)) h = '101113';
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgbToHex(r, g, b){
    return '#' + [r, g, b].map(v => clamp(Math.round(v)).toString(16).padStart(2, '0')).join('');
  }
  function mix(hexA, hexB, t){
    const a = hexToRgb(hexA), b = hexToRgb(hexB);
    return rgbToHex(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t);
  }
  function relLuminance(hex){
    const { r, g, b } = hexToRgb(hex);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  // Subtiele radial gradient afgeleid van één basiskleur, zowel voor een
  // donkere als lichte basiskleur (voorkomt dat een lichte keuze "uitbrandt"
  // naar wit, of een donkere keuze naar puur zwart afvlakt).
  function buildGradient(baseHex){
    const dark = relLuminance(baseHex) < 0.5;
    const lightStop = mix(baseHex, '#ffffff', dark ? 0.10 : 0.06);
    const midStop = baseHex;
    const darkStop = mix(baseHex, '#000000', dark ? 0.42 : 0.12);
    return `radial-gradient(ellipse at 50% 15%, ${lightStop} 0%, ${midStop} 45%, ${darkStop} 100%)`;
  }
  // "Uit"-kleur voor letters/stippen: de tekstkleur op laag alfa, zodat dit
  // altijd leesbaar oogt bovenop willekeurige achtergrond — een aangepast
  // kleurverloop, de thema-achtergrond, of volledige transparantie.
  function dimRgba(textHex, alpha){
    const { r, g, b } = hexToRgb(textHex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  function onGlow(textHex, alpha){
    const { r, g, b } = hexToRgb(textHex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /* ============================== KAART ============================== */
  class WordClockCard extends HTMLElement {
    static getStubConfig(){
      return {
        language: 'nl',
        background_mode: 'gradient',
        background_color: DEFAULT_BG,
        text_color: DEFAULT_TEXT
      };
    }
    static getConfigElement(){
      return document.createElement('word-clock-card-editor');
    }

    setConfig(config){
      if (!config) throw new Error('Ongeldige configuratie');
      const language = (config.language && LANGS[config.language]) ? config.language : 'nl';
      const background_mode = ['gradient', 'theme', 'none'].includes(config.background_mode)
        ? config.background_mode
        : 'gradient';
      this._config = {
        language,
        background_mode,
        background_color: config.background_color || DEFAULT_BG,
        text_color: config.text_color || DEFAULT_TEXT
      };
      this._builtLang = null;
      this._render(true);
    }

    set hass(hass){ this._hass = hass; }

    getCardSize(){ return 4; }

    connectedCallback(){
      this._render(true);
      if (!this._timer) {
        this._timer = setInterval(() => this._render(false), 1000);
      }
    }
    disconnectedCallback(){
      if (this._timer) { clearInterval(this._timer); this._timer = null; }
    }

    _ensureDom(){
      if (this.shadowRoot) return;
      this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = `
        :host { display:block; }
        ha-card {
          overflow: hidden;
          padding: 0;
        }
        .panel {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          padding: 9% 8%;
          box-sizing: border-box;
          container-type: inline-size;
          container-name: wordclock;
        }
        .dot {
          position:absolute; width: 1.6%; height: 1.6%; min-width:5px; min-height:5px;
          border-radius:50%;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .dot.tl{ top: 4%; left: 4%; } .dot.tr{ top: 4%; right: 4%; }
        .dot.bl{ bottom: 4%; left: 4%; } .dot.br{ bottom: 4%; right: 4%; }
        .grid {
          display:grid; grid-template-columns: repeat(11, 1fr);
          width:100%; height:100%; row-gap: 2%;
        }
        .cell {
          display:flex; align-items:center; justify-content:center; font-weight:700;
          font-size: clamp(9px, 4.4vw, 34px);
          transition: color 0.5s ease, text-shadow 0.5s ease;
          user-select:none;
          font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        /* Schaal de letters met de werkelijke breedte van de kaart (niet het
           browservenster), zodat de tekst ook in smalle dashboard-kolommen
           of naast andere kaarten netjes past. vw hierboven is de fallback
           voor browsers zonder container query-ondersteuning. */
        @container wordclock (min-width: 0px) {
          .cell { font-size: clamp(9px, 5cqw, 34px); }
        }
      `;
      const card = document.createElement('ha-card');
      const panel = document.createElement('div');
      panel.className = 'panel';
      const dots = {};
      ['tl', 'tr', 'bl', 'br'].forEach(pos => {
        const d = document.createElement('div');
        d.className = `dot ${pos}`;
        panel.appendChild(d);
        dots[pos] = d;
      });
      const grid = document.createElement('div');
      grid.className = 'grid';
      panel.appendChild(grid);
      card.appendChild(panel);
      this.shadowRoot.appendChild(style);
      this.shadowRoot.appendChild(card);
      this._els = { card, panel, grid, dots };
    }

    _buildGrid(langKey){
      const lang = LANGS[langKey];
      const { grid } = this._els;
      grid.innerHTML = '';
      grid.style.gridTemplateRows = `repeat(${lang.rows.length}, 1fr)`;
      this._cellRefs = [];
      for (let r = 0; r < lang.rows.length; r++) {
        this._cellRefs.push([]);
        for (let c = 0; c < 11; c++) {
          const span = document.createElement('div');
          span.className = 'cell';
          span.textContent = lang.rows[r][c];
          grid.appendChild(span);
          this._cellRefs[r].push(span);
        }
      }
      this._builtLang = langKey;
    }

    _applyColors(){
      const { background_mode, background_color, text_color } = this._config;
      const { card } = this._els;

      if (background_mode === 'gradient') {
        const gradient = buildGradient(background_color);
        card.style.setProperty('--ha-card-background', gradient);
        card.style.background = gradient;
      } else if (background_mode === 'none') {
        card.style.removeProperty('--ha-card-background');
        card.style.background = 'transparent';
      } else {
        // 'theme': geen inline achtergrond zetten, ha-card gebruikt dan
        // gewoon var(--ha-card-background, var(--card-background-color)).
        card.style.removeProperty('--ha-card-background');
        card.style.removeProperty('background');
      }

      this._dimColor = dimRgba(text_color, 0.30);
    }

    _render(force){
      this._ensureDom();
      if (force || this._lastLang !== this._config.language) {
        this._buildGrid(this._config.language);
        this._lastLang = this._config.language;
      }
      if (
        force ||
        this._lastBgMode !== this._config.background_mode ||
        this._lastBg !== this._config.background_color ||
        this._lastText !== this._config.text_color
      ) {
        this._applyColors();
        this._lastBgMode = this._config.background_mode;
        this._lastBg = this._config.background_color;
        this._lastText = this._config.text_color;
      }

      const now = new Date();
      const hour24 = now.getHours();
      const minute = now.getMinutes();
      const extraDots = minute % 5;
      const lang = LANGS[this._config.language];
      const onColor = this._config.text_color;
      const offColor = this._dimColor;

      for (let r = 0; r < this._cellRefs.length; r++) {
        for (let c = 0; c < 11; c++) {
          this._cellRefs[r][c].style.color = offColor;
          this._cellRefs[r][c].style.textShadow = 'none';
        }
      }
      lang.build(hour24, minute).forEach(name => {
        const seg = lang.seg[name];
        if (!seg) return;
        const [row, start, end] = seg;
        for (let c = start; c <= end; c++) {
          const cell = this._cellRefs[row][c];
          cell.style.color = onColor;
          cell.style.textShadow = `0 0 10px ${onGlow(onColor, 0.35)}`;
        }
      });

      const dotOrder = ['tl', 'tr', 'br', 'bl'];
      dotOrder.forEach((pos, i) => {
        const on = i < extraDots;
        const d = this._els.dots[pos];
        d.style.background = on ? onColor : offColor;
        d.style.boxShadow = on ? `0 0 6px 1px ${onGlow(onColor, 0.7)}` : 'none';
      });
    }
  }

  /* ============================== EDITOR ============================== */
  class WordClockCardEditor extends HTMLElement {
    setConfig(config){
      this._config = Object.assign({}, WordClockCard.getStubConfig(), config);
      this._render();
    }
    set hass(hass){ this._hass = hass; }

    _render(){
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      const c = this._config;
      const langOptions = Object.keys(LANGS)
        .map(key => `<option value="${key}" ${key === c.language ? 'selected' : ''}>${LANG_NAMES[key] || key.toUpperCase()}</option>`)
        .join('');
      const bgModeOptions = [
        ['gradient', 'Kleurverloop (aangepast)'],
        ['theme', 'Standaard thema-achtergrond'],
        ['none', 'Geen (transparant)']
      ].map(([val, label]) => `<option value="${val}" ${val === c.background_mode ? 'selected' : ''}>${label}</option>`).join('');

      this.shadowRoot.innerHTML = `
        <style>
          .row { display:flex; align-items:center; justify-content:space-between; padding:12px 0; gap: 12px; }
          .row + .row { border-top: 1px solid var(--divider-color, #e0e0e0); }
          label { font-size:14px; color: var(--primary-text-color, #222); }
          select {
            font-size:14px; padding:6px 8px; border-radius:6px;
            border:1px solid var(--divider-color, #ccc);
            background: var(--card-background-color, #fff);
            color: var(--primary-text-color, #222);
            min-width: 180px;
          }
          input[type="color"] {
            width:44px; height:32px; padding:0; border:1px solid var(--divider-color, #ccc);
            border-radius:6px; background:none; cursor:pointer;
          }
          .row.hidden { display:none; }
          .wrap { padding: 4px 8px; }
        </style>
        <div class="wrap">
          <div class="row">
            <label>Taal</label>
            <select id="language">${langOptions}</select>
          </div>
          <div class="row">
            <label>Achtergrond</label>
            <select id="background_mode">${bgModeOptions}</select>
          </div>
          <div class="row ${c.background_mode === 'gradient' ? '' : 'hidden'}" id="row_background_color">
            <label>Achtergrondkleur</label>
            <input type="color" id="background_color" value="${c.background_color}">
          </div>
          <div class="row">
            <label>Tekstkleur</label>
            <input type="color" id="text_color" value="${c.text_color}">
          </div>
        </div>
      `;

      this.shadowRoot.getElementById('background_mode').addEventListener('change', (e) => {
        this._update({ background_mode: e.target.value });
      });
      this.shadowRoot.getElementById('language').addEventListener('change', (e) => {
        this._update({ language: e.target.value });
      });
      this.shadowRoot.getElementById('background_color').addEventListener('input', (e) => {
        this._update({ background_color: e.target.value });
      });
      this.shadowRoot.getElementById('text_color').addEventListener('input', (e) => {
        this._update({ text_color: e.target.value });
      });
    }

    _update(patch){
      this._config = Object.assign({}, this._config, patch);
      const event = new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      });
      this.dispatchEvent(event);
    }
  }

  customElements.define('word-clock-card', WordClockCard);
  customElements.define('word-clock-card-editor', WordClockCardEditor);

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'word-clock-card',
    name: 'Word Clock',
    description: 'Meertalige QLOCKTWO-stijl woordklok (NL/EN/DE/FR/IT/ES/EL/DA/SV/NO/RO)',
    preview: true
  });
})();
