/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * 用于管理Cubism SDK示例中使用的WebGL的类
 */
export class LAppGlManager {
  public constructor() {
    this._gl = null;
  }

  public initialize(canvas: HTMLCanvasElement): boolean {
    // 初始化gl上下文
    this._gl = canvas.getContext('webgl2');

    if (!this._gl) {
      // gl初期化失敗
      alert('Cannot initialize WebGL. This browser does not support.');
      this._gl = null;
      // document.body.innerHTML =
      //   'This browser does not support the <code>&lt;canvas&gt;</code> element.';
      return false;
    }
    return true;
  }

  /**
   * 释放
   */
  public release(): void { }

  public getGl(): WebGLRenderingContext | WebGL2RenderingContext {
    return this._gl;
  }

  private _gl: WebGLRenderingContext | WebGL2RenderingContext = null;
}
