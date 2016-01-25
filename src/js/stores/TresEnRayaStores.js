"use strict";
const EventEmitter = require('events').EventEmitter;
var TresEnRayaDispatcher = require('../dispatchers/TresEnRayaDispatcher');
var Constants = require('../constants/TresEnRayaConstants');
var turno = Constants.JUGADORX;
var valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
var nJugadas = 0;

var TresEnRayaStore = Object.assign({}, EventEmitter.prototype, {
	getTurno: function () {
		return turno;
	},
	getValores: function () {
		return valoresTablero;
	},
	getJugadas: function () {
		return nJugadas;
	},
	compruebaGanador: function(){

 		if(nJugadas > 4){

 		var casilla1 = valoresTablero[0][0];
 		var casilla2 = valoresTablero[0][1];
 		var casilla3 = valoresTablero[0][2];
 		var casilla4 = valoresTablero[1][0];
 		var casilla5 = valoresTablero[1][1];
 		var casilla6 = valoresTablero[1][2];
 		var casilla7 = valoresTablero[2][0];
 		var casilla8 = valoresTablero[2][1];
 		var casilla9 = valoresTablero[2][2];
 		

 			if ((casilla1 == casilla5 && casilla9 == casilla5) || 
 				(casilla5 == casilla3 && casilla5 == casilla7)) {
			
				alert("Se acabo la partida")
				this.setState({
 					nJugadas:0
 				});
 				return
			
			}

			if ((casilla1 == casilla2 && casilla1 == casilla3 && casilla1 != '-' && casilla2 != '-' && casilla3 != '-') || 
 				(casilla4 == casilla5 && casilla4 == casilla6 && casilla4 != '-' && casilla5 != '-' && casilla6 != '-') || 
 				(casilla7 == casilla8 && casilla7 == casilla9 && casilla7 != '-' && casilla8 != '-' && casilla9 != '-') || 
 				(casilla1 == casilla4 && casilla1 == casilla7 && casilla1 != '-' && casilla4 != '-' && casilla7 != '-') || 
 				(casilla2 == casilla5 && casilla2 == casilla8 && casilla2 != '-' && casilla5 != '-' && casilla8 != '-') || 
 				(casilla3 == casilla6 && casilla3 == casilla9 && casilla3 != '-' && casilla6 != '-' && casilla9 != '-'))
 			{
			
				alert("Se Acabo la Partida")
				this.setState({
 					nJugadas:0
 				});
 				return
			
			}

		}

	},
	reset: function () {
		turno = Constants.JUGADORX;
		valoresTablero = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
		nJugadas = 0;
	},
	addChangeListener(callback) {
		this.on(Constants.CHANGE_EVENT, callback);
	},
	removeChangeListener(callback) {
		this.removeListener(Constants.CHANGE_EVENT, callback);
	},
	emitChange() {
		this.emit(Constants.CHANGE_EVENT);
	}
});


TresEnRayaDispatcher.register(function (payload) {
	switch (payload.type) {
		case Constants.ActionTypes.JUGAR_POSICION:
			let nuevoValor = turno === Constants.JUGADORX ? 'X' : '0';
			turno = turno === Constants.JUGADORX ? Constants.JUGADOR0 : Constants.JUGADORX;
			valoresTablero[payload.x][payload.y] = nuevoValor;
			nJugadas = nJugadas+1;
			TresEnRayaStore.emitChange();
			TresEnRayaStore.compruebaGanador();
			break;
	}
});

module.exports = TresEnRayaStore;