/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { csmVector } from '@framework/type/csmvector';
import { CubismFramework, Option } from '@framework/live2dcubismframework';
import * as LAppDefine from './lappdefine';
import { LAppPal } from './lapppal';
import { LAppSubdelegate } from './lappsubdelegate';
import { CubismLogError } from '@framework/utils/cubismdebug';

export let s_instance: LAppDelegate = null;

/**
 * 应用程序类
 * 进行Cubism SDK的管理
 */
export class LAppDelegate {
  /**
   * 返回类的实例（单例）
   * 如果实例尚未生成，则在内部生成实例
   *
   * @return 类的实例
   */
  public static getInstance(): LAppDelegate {
    if (s_instance == null) {
      s_instance = new LAppDelegate();
    }

    return s_instance;
  }

  /**
   * 释放类的实例（单例）
   */
  public static releaseInstance(): void {
    if (s_instance != null) {
      s_instance.release();
    }

    s_instance = null;
  }

  /**
   * 在指针变为活动状态时被调用
   */
  private onPointerBegan(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onPointBegan(e.pageX, e.pageY);
    }
  }

  /**
   * 当指针移动时被调用
   */
  private onPointerMoved(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onPointMoved(e.pageX, e.pageY);
    }
  }

  /**
   * 当指针变为非活动状态时被调用。
   */
  private onPointerEnded(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onPointEnded(e.pageX, e.pageY);
    }
  }

  /**
   * 当指针被取消时被调用
   */
  private onPointerCancel(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onTouchCancel(e.pageX, e.pageY);
    }
  }

  /**
   * 调整画布大小并重新初始化视图
   */
  public onResize(): void {
    for (let i = 0; i < this._subdelegates.getSize(); i++) {
      this._subdelegates.at(i).onResize();
    }
  }

  /**
   * 执行处理
   */
  public run(): void {
    // 主循环
    const loop = (): void => {
      // 确认实例是否存在
      if (s_instance == null) {
        return;
      }

      // 时间更新
      LAppPal.updateTime();

      for (let i = 0; i < this._subdelegates.getSize(); i++) {
        this._subdelegates.at(i).update();
      }

      // 为了循环而进行递归调用
      requestAnimationFrame(loop);
    };
    loop();
  }

  /**
   * 释放
   */
  private release(): void {
    this.releaseEventListener();
    this.releaseSubdelegates();

    // 释放Cubism SDK
    CubismFramework.dispose();

    this._cubismOption = null;
  }

  /**
   * 解除事件监听器
   */
  private releaseEventListener(): void {
    document.removeEventListener('pointerup', this.pointBeganEventListener);
    this.pointBeganEventListener = null;
    document.removeEventListener('pointermove', this.pointMovedEventListener);
    this.pointMovedEventListener = null;
    document.removeEventListener('pointerdown', this.pointEndedEventListener);
    this.pointEndedEventListener = null;
    document.removeEventListener('pointerdown', this.pointCancelEventListener);
    this.pointCancelEventListener = null;
  }

  /**
   * 释放 Subdelegate
   */
  private releaseSubdelegates(): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().release();
    }

    this._subdelegates.clear();
    this._subdelegates = null;
  }

  /**
   * 初始化APP所需的内容
   */
  public initialize(): boolean {
    // Cubism SDK的初始化
    this.initializeCubism();

    this.initializeSubdelegates();
    this.initializeEventListener();

    return true;
  }

  /**
   * 设置事件监听器
   */
  private initializeEventListener(): void {
    this.pointBeganEventListener = this.onPointerBegan.bind(this);
    this.pointMovedEventListener = this.onPointerMoved.bind(this);
    this.pointEndedEventListener = this.onPointerEnded.bind(this);
    this.pointCancelEventListener = this.onPointerCancel.bind(this);

    // 注册指针相关的回调函数
    document.addEventListener('pointerdown', this.pointBeganEventListener, {
      passive: true
    });
    document.addEventListener('pointermove', this.pointMovedEventListener, {
      passive: true
    });
    document.addEventListener('pointerup', this.pointEndedEventListener, {
      passive: true
    });
    document.addEventListener('pointercancel', this.pointCancelEventListener, {
      passive: true
    });
  }

  /**
   * Cubism SDK 初始化
   */
  private initializeCubism(): void {
    LAppPal.updateTime();

    // setup cubism
    this._cubismOption.logFunction = LAppPal.printMessage;
    this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
    CubismFramework.startUp(this._cubismOption);

    // initialize cubism
    CubismFramework.initialize();
  }

  /**
   * 生成并配置Canvas，初始化Subdelegate
   */
  private initializeSubdelegates(): void {
    let width: number = 100;
    let height: number = 100;
    if (LAppDefine.CanvasNum > 3) {
      const widthunit: number = Math.ceil(Math.sqrt(LAppDefine.CanvasNum));
      const heightUnit = Math.ceil(LAppDefine.CanvasNum / widthunit);
      width = 100.0 / widthunit;
      height = 100.0 / heightUnit;
    } else {
      width = 100.0 / LAppDefine.CanvasNum;
    }

    this._canvases.prepareCapacity(LAppDefine.CanvasNum);
    this._subdelegates.prepareCapacity(LAppDefine.CanvasNum);
    for (let i = 0; i < LAppDefine.CanvasNum; i++) {
      const canvas = document.createElement('canvas');
      this._canvases.pushBack(canvas);
      canvas.style.width = `${width}vw`;
      canvas.style.height = `${height}vh`;

      // 将Canvas添加到DOM中
      document.body.appendChild(canvas);
    }

    for (let i = 0; i < this._canvases.getSize(); i++) {
      const subdelegate = new LAppSubdelegate();
      subdelegate.initialize(this._canvases.at(i));
      this._subdelegates.pushBack(subdelegate);
    }

    for (let i = 0; i < LAppDefine.CanvasNum; i++) {
      if (this._subdelegates.at(i).isContextLost()) {
        CubismLogError(
          `The context for Canvas at index ${i} was lost, possibly because the acquisition limit for WebGLRenderingContext was reached.`
        );
      }
    }
  }

  /**
   * 私有的构造函数
   */
  private constructor() {
    this._cubismOption = new Option();
    this._subdelegates = new csmVector<LAppSubdelegate>();
    this._canvases = new csmVector<HTMLCanvasElement>();
  }

  /**
   * Cubism SDK Option
   */
  private _cubismOption: Option;

  /**
   * 操作対象のcanvas要素
   */
  private _canvases: csmVector<HTMLCanvasElement>;

  /**
   * Subdelegate
   */
  private _subdelegates: csmVector<LAppSubdelegate>;

  /**
   * 已注册的事件监听器函数对象
   */
  private pointBeganEventListener: (this: Document, ev: PointerEvent) => void;

  /**
   * 已注册的事件监听器函数对象
   */
  private pointMovedEventListener: (this: Document, ev: PointerEvent) => void;

  /**
   * 已注册的事件监听器函数对象
   */
  private pointEndedEventListener: (this: Document, ev: PointerEvent) => void;

  /**
   * 已注册的事件监听器函数对象
   */
  private pointCancelEventListener: (this: Document, ev: PointerEvent) => void;
}
