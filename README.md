# CatDeskPet

一只在桌面上活蹦乱跳的小猫。Tauri 2 + 纯 SVG 手绘，~10 MB 桌面宠物，macOS / Windows 都能跑。

## 功能

- **5 套毛色**：橘 / 三花 / 奶牛 / 灰虎斑 / 黑白（右键菜单切换）
- **困倦度系统**：醒着会累，累到自己睡，睡到 0 自然醒，点击可叫醒
- **多 gait**：walk / run / 跳跃 / 微停；缓动加减速
- **狩猎模式**：随机 dash / leap 连跳 / 伸爪 swat / leap-swat 组合
- **闲置动作**：蹲坐 / 哈欠 / 伸懒腰 / 张望 / 卷尾 / 抖毛 / 翻肚 / 面包猫 / 凝视 / 翘屁股
- **眼神追踪**：眼珠在小范围自由跟随鼠标
- **3D 感转身**：跳一下落地变向，不是 2D 翻面
- **鼠标交互**：
  - 单击 → 喵 / 爱心 / 转圈 / 扑 / 蹦跶（随机）
  - 长按 0.5s → 抚摸模式（咕噜咕噜~）
  - 拖动 → 抓着走，松手晕一下
  - 双击 → 投喂 🐟（吃完困倦度大幅下降）
  - 鼠标附近快速划圈 → 触发转圈
- **环境感知**：
  - 鼠标远端快速移动 → 猫停下盯着看
  - 鼠标 90 秒无大动作 → 走过来撒娇 ❤
  - 22:00–06:00 困得更快（×2）
  - 屏幕边缘偶发抓墙
- **彩蛋**：
  - 每 3–6 分钟概率性生成毛线球，猫追着拍
  - 节日自动戴帽：圣诞 / 万圣 / 新年 / 情人节
  - 右键 → 拍照模式（茄子~ 📸 全屏白闪）

## macOS 安装（已编好的包）

发布版从 [Releases](../../releases) 下载 `CatDeskPet_x.y.z_universal.dmg`，拖进 Applications。

首次打开 macOS 会拦截（未签名），右键 .app → 打开 → 仍然打开。或：

```bash
xattr -dr com.apple.quarantine /Applications/CatDeskPet.app
```

不上 Dock、不在 Cmd+Tab — 右键小猫弹菜单（换毛色 / 让她睡 / 拍照 / 丢玩具 / 退出）。

## Windows 编译

macOS 端无法交叉编译 Windows 包（Tauri 的 webview2 binding 限制）。需要在 Windows 机器上编：

### 一次性环境

| 工具 | 来源 |
|---|---|
| Rust toolchain | https://win.rustup.rs (`rustup-init.exe`，全默认) |
| VS Build Tools 2022 | https://visualstudio.microsoft.com/visual-cpp-build-tools/ — 安装时勾选 **Desktop development with C++** |
| Node.js LTS | https://nodejs.org/ |
| WebView2 Runtime | Win 11 自带；Win 10 装 [Evergreen Bootstrapper](https://developer.microsoft.com/microsoft-edge/webview2/) |

### 编译

```powershell
git clone https://github.com/chinaszzt/desktop-cat
cd desktop-cat
npm install
npm run tauri build
```

首编 5–10 分钟，之后增量编译 10 秒以内。

### 产物位置

```
src-tauri\target\release\bundle\msi\CatDeskPet_0.1.0_x64_en-US.msi   ← MSI 安装包
src-tauri\target\release\bundle\nsis\CatDeskPet_0.1.0_x64-setup.exe  ← NSIS 安装
src-tauri\target\release\cat-desk-pet.exe                            ← 直接能跑的 exe
```

双击 .msi 或 setup.exe 安装。未签名，Windows SmartScreen 会弹 "Windows protected your PC" → **More info → Run anyway**。

## macOS 编译（自己出 dmg）

```bash
# 装 Rust（一次性）
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 装 Apple Silicon + Intel target（universal 用）
rustup target add x86_64-apple-darwin aarch64-apple-darwin

npm install

# 单架构（当前机器）
npm run tauri build

# Universal binary（arm64 + x86_64 都能跑）
npm run tauri build -- --target universal-apple-darwin
```

> 注：Tauri 自带的 `bundle_dmg.sh` 在 universal 模式偶尔挂图标 AppleScript，那时 `.app` 已生成好，手动 hdiutil 重打：
>
> ```bash
> hdiutil create -volname "CatDeskPet" \
>   -srcfolder src-tauri/target/universal-apple-darwin/release/bundle/macos/CatDeskPet.app \
>   -ov -format UDZO ~/Desktop/CatDeskPet.dmg
> ```

## Dev 模式（边改边看）

```bash
npm run tauri dev
```

启动实时窗口。前端文件改了之后杀进程重启（Tauri 默认只 watch `src-tauri/`）。

## 项目结构

```
src/                     前端（HTML + CSS + vanilla JS）
  index.html             DOM 骨架（cat / 右键菜单 / 玩具 / 鱼 / 闪光）
  main.js                小猫 SVG + 行为状态机 + 动画循环
  styles.css             毛色 / 气泡 / 菜单样式
src-tauri/               Rust 端
  src/lib.rs             窗口配置 + 系统托盘 + 鼠标位置轮询
  tauri.conf.json        窗口属性（透明 / 置顶 / Accessory）
  capabilities/          权限声明
```

## License

MIT
