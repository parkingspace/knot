#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      app.listen_global("test", |event| {
        println!("event received: {:?}", event);
      });

      let window = app.get_window("main").unwrap();
      #[cfg(debug_assertions)] // only include this code on debug builds
      {
        window.open_devtools();
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
