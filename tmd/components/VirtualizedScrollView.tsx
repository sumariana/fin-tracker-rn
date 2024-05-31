/**
 * Created by Widiana Putra on 04/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { FlatList } from "react-native";

const VirtualizedScrollView = (props: any) => {
  return (
    <FlatList
      {...props}
      data={[]}
      keyExtractor={(e, i) => "dom" + i.toString()}
      ListEmptyComponent={null}
      renderItem={null}
      ListHeaderComponent={() => (
        <>{props.children}</>
      )}
    />
  );
};

export default VirtualizedScrollView;
