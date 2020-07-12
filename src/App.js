import React, { useState, useCallback, useEffect, useRef } from 'react';
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

const ListBox = () => {
  const ref = useRef();
  const listNum = useRef(1);
  const [list, setList] = useState([]);

  const onInsert = useCallback(()=>{
    const nextList = list.concat(listNum.current++);
    setList(nextList);
  }, [list]);

  const Lists = list.map((num, index) => {
      return (
        <List key={index}>
          {num}
        </List>
      );
    });

  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      //redux dispatch
      onInsert();
      observer.observe(entry.target);
    }
  }, [onInsert]);

  useEffect(() => {
    let observer;
    if (ref.current) {
      observer = new IntersectionObserver(checkIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [checkIntersect]);

  return (
    <ListArea className="scroll-control">
      {Lists}
      <Sentinel ref={ref} />
    </ListArea>
  );
};

export default ListBox;
