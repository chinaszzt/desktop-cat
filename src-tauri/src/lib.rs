use std::thread;
use std::time::Duration;

use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem, Submenu},
    tray::TrayIconBuilder,
    AppHandle, Emitter, Manager,
};

#[tauri::command]
fn set_passthrough(window: tauri::Window, enabled: bool) -> Result<(), String> {
    window
        .set_ignore_cursor_events(enabled)
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn quit_app(app: AppHandle) {
    app.exit(0);
}

fn start_cursor_poll(app: AppHandle) {
    thread::spawn(move || loop {
        if let Some(window) = app.get_webview_window("main") {
            let cursor = app.cursor_position();
            let win_pos = window.outer_position();
            let scale = window.scale_factor();
            if let (Ok(c), Ok(wp), Ok(sc)) = (cursor, win_pos, scale) {
                let lx = (c.x - wp.x as f64) / sc;
                let ly = (c.y - wp.y as f64) / sc;
                let _ = app.emit("cursor", (lx, ly));
            }
        }
        thread::sleep(Duration::from_millis(40));
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(target_os = "macos")]
            {
                let _ = app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            }

            if let Some(window) = app.get_webview_window("main") {
                let _ = window.set_ignore_cursor_events(true);
                if let Some(monitor) = window.current_monitor().ok().flatten() {
                    let size = monitor.size();
                    let pos = monitor.position();
                    let _ = window.set_position(tauri::PhysicalPosition::new(pos.x, pos.y));
                    let _ = window.set_size(tauri::PhysicalSize::new(size.width, size.height));
                }
            }

            let toggle_hide = MenuItem::with_id(
                app,
                "toggle_hide",
                "隐藏 / 显示小猫",
                true,
                None::<&str>,
            )?;
            let sep1 = PredefinedMenuItem::separator(app)?;

            let orange = MenuItem::with_id(app, "color_orange", "橘猫", true, None::<&str>)?;
            let calico = MenuItem::with_id(app, "color_calico", "三花", true, None::<&str>)?;
            let cow = MenuItem::with_id(app, "color_cow", "奶牛", true, None::<&str>)?;
            let tabby = MenuItem::with_id(app, "color_tabby", "灰虎斑", true, None::<&str>)?;
            let tuxedo = MenuItem::with_id(app, "color_tuxedo", "黑白", true, None::<&str>)?;
            let color_menu = Submenu::with_id_and_items(
                app,
                "color",
                "换毛色",
                true,
                &[&orange, &calico, &cow, &tabby, &tuxedo],
            )?;

            let sep2 = PredefinedMenuItem::separator(app)?;
            let quit_item = MenuItem::with_id(app, "quit", "退出", true, None::<&str>)?;

            let menu = Menu::with_items(
                app,
                &[&toggle_hide, &sep1, &color_menu, &sep2, &quit_item],
            )?;

            let _tray = TrayIconBuilder::with_id("main-tray")
                .icon(app.default_window_icon().unwrap().clone())
                .icon_as_template(true)
                .tooltip("CatDeskPet 🐾")
                .menu(&menu)
                .show_menu_on_left_click(true)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "toggle_hide" => {
                        if let Some(win) = app.get_webview_window("main") {
                            if win.is_visible().unwrap_or(false) {
                                let _ = win.hide();
                            } else {
                                let _ = win.show();
                            }
                        }
                    }
                    "quit" => app.exit(0),
                    id if id.starts_with("color_") => {
                        let color = id.strip_prefix("color_").unwrap_or("orange");
                        let _ = app.emit("change-color", color.to_string());
                    }
                    _ => {}
                })
                .build(app)?;

            start_cursor_poll(app.handle().clone());

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![set_passthrough, quit_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
