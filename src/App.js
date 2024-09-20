import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import DashBoard from './components/DashBoard/DashBoard';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { dataState, dataFetchEffect, fetchDataTrigger, fetchDataSelector } from './Recoil/atoms';
import Loading from './components/Loading/Loading';

const App = () => {
  const data = useRecoilValue(dataState);

  const fetchData = useRecoilCallback(({ set, snapshot }) => async () => {
    try {
      set(dataState, (prevState) => ({ ...prevState, loading: true }));
      const fetchedData = await snapshot.getPromise(fetchDataSelector);
      set(dataFetchEffect, fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      set(dataState, (prevState) => ({ ...prevState, loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data.loading ? (
    <Loading />
  ) : (
    <div style={{ paddingTop: "10px" }} >
      <NavBar />
      <hr style={{ marginTop: "10px" }} />
      <DashBoard />
    </div>
  );
};

export default App;