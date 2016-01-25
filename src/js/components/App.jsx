const Tablero = require('./Tablero.jsx');
const Cabecera = require('./Cabecera.jsx');
var TresEnRayaStore = require('../stores/TresEnRayaStores');

function getAppStateFromStore() {
	return {
		turno: TresEnRayaStore.getTurno(),
		valores: TresEnRayaStore.getValores(),
		nJugadas: TresEnRayaStore.getJugadas()
	};
}

var App = React.createClass({
	getInitialState: function(){
		return getAppStateFromStore();
	},
	reiniciarTablero: function(){
		return TresEnRayaStore.reset(), TresEnRayaStore.emitChange();
	},
	componentDidMount() {
		TresEnRayaStore.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		TresEnRayaStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getAppStateFromStore());
	},
	render: function(){

		if(this.state.nJugadas == 9){
	 			alert("Empate Técnico")
	 			this.setState({
	 			nJugadas:0
	 		});
	 	}

		var texto = "Turno del " + this.state.turno;
		return (
			<div>
				<Cabecera texto={texto}/>
				<Tablero valores={this.state.valores}/>
				<button onClick={this.reiniciarTablero}>Reiniciar</button>
			</div>
		)
	}
});

module.exports = App;