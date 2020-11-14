import React, { useRef, useState, useCallback } from 'react';
import useInfiniteScroll from './useInfiniteScroll';
import styled from 'styled-components';

const ListArea = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  padding-top: 16px;
  padding-bottom: 16px;
  background: transparent;
  overflow-y: scroll;
`;

const List = styled.div`
  height: 68px;
  margin: 0 16px;
  border-bottom: solid 1px #d8d8d8;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    border-bottom: none;
  }
`;

const Sentinel = styled.div`
  height: 1px;
`;

export default function InfiniteScroll() {
  const listNum = useRef(1);
  const [list, setList] = useState([]);

  const onInsert = useCallback(()=>{
    const nextList = list.concat(listNum.current++);
    setList(nextList);
  }, [list]);

  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      onInsert();
      observer.observe(entry.target);
    }
  }, [onInsert]);

  const { ref } = useInfiniteScroll(checkIntersect);

  const Lists = list.map((num, index) => {
    return (
      <List key={index}>
        {num}
      </List>
    );
  });

  return (
    <ListArea className="scroll-control">
      {Lists}
      <Sentinel ref={ref} />
    </ListArea>
  );
};
