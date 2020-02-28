import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../components/Spinner';
import ListaLugares from '../components/ListaLugares';
import actions from '../../actions';

const { fetchTodosLosLugares } = actions;

const Lugares = props => {
  const { fetchTodosLosLugares } = props;
  useEffect(() => {
    fetchTodosLosLugares();
  }, [fetchTodosLosLugares]);

  if (props.cargando) {
    return <Spinner />;
  }

  return (
    <div className='container '>
      <ListaLugares lugares={props.lugares} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cargando: state.todosLosLugares.cargando,
    lugares: state.todosLosLugares.lugares,
    error: state.todosLosLugares.error
  };
};

export default connect(mapStateToProps, { fetchTodosLosLugares })(Lugares);
