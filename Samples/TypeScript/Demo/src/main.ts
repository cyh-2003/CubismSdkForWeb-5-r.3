/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

/**
 * 浏览器加载后的处理
 */
window.addEventListener(
  'load',
  (): void => {
    // 初始化 WebGL 并创建应用程序实例
    if (!LAppDelegate.getInstance().initialize()) {
      return;
    }

    LAppDelegate.getInstance().run();
  },
  { passive: true }
);

/**
 * 退出时的处理
 */
window.addEventListener(
  'beforeunload',
  (): void => LAppDelegate.releaseInstance(),
  { passive: true }
);
