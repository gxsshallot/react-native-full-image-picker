import { ActionSheet } from 'react-native-hecom-common';
import { PhotoPageTypes } from "./PhotoModalPage";

export function choose(type, callback) {
    const processFunc = (type) => callback && callback(type);
    if (type === global.constant.field.subtype.image.photo) {
        const actions = ['拍照', '从相册选择', '取消'];
        ActionSheet.showActionSheetWithOptions(
            {
                options: actions,
                cancelButtonIndex: actions.length - 1,
                maskClosable: true,
            },
            (clickIndex) => {
                if (clickIndex >= actions.length - 1) {
                    processFunc(null);
                    return;
                }
                let type;
                if (clickIndex === 0) {
                    type = PhotoPageTypes.camera;
                } else if (clickIndex === 1) {
                    type = PhotoPageTypes.album;
                }
                processFunc(type);
            }
        )
    } else if (type === global.constant.field.subtype.image.camera) {
        processFunc(PhotoPageTypes.camera);
    }
}