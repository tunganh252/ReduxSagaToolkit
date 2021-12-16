import { useAppDispatch } from 'app/hooks';
import React, { useEffect } from 'react';
import { studentActions } from '../studentSlice';

interface ListPageProps {
  test?: boolean;
}

const ListPage = (props: ListPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      studentActions.fetchStudentList({
        _page: 1,
        _limit: 15,
      })
    );
  }, [dispatch]);

  return <div>ListPage</div>;
};

export default ListPage;
