import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native-web';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import CanvasItem from './CanvasItem';
import Selection from './Selection';
import CanvasBackground from './CanvasBackground';
import { itemIdsState, canvasLayoutState } from '../../recoil/atoms';

export default function Canvas() {
  const ref = useRef();
  const itemIds = useRecoilValue(itemIdsState);
  const setLayoutState = useSetRecoilState(canvasLayoutState);

  const onLayout = ({
    nativeEvent: {
      layout: { x, y, width, height }
    }
  }) => setLayoutState({ x, y, width, height });

  return (
    <View style={styles.root} ref={ref} onLayout={onLayout}>
      <View style={styles.container}>
        <CanvasBackground />
        {itemIds.map(id => <CanvasItem key={`item-${id}`} id={id} />)}
        <Selection />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'visible',
    zIndex: 0,
  },
  container: {
    flex: 1,
  },
  svg: {
    flex: 1,
  }
})
