if [[ "$OSTYPE" == "linux-gnu"* ]]; then
	if command -v apt-get >/dev/null; then
		echo "Detected apt!"
		echo "Installing dependencies with apt..."
		
		DEBIAN_TAURI_DEPS="libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev" # Tauri dependencies

		sudo apt-get -y update
		sudo apt-get -y install $DEBIAN_TAURI_DEPS 
	elif command -v pacman >/dev/null; then
		echo "Detected pacman!"
		echo "Installing dependencies with pacman..."

		ARCH_TAURI_DEPS="webkit2gtk base-devel curl wget openssl appmenu-gtk-module gtk3 libappindicator-gtk3 librsvg libvips" # Tauri deps https://tauri.studio/guides/getting-started/setup/linux#1-system-dependencies

		sudo pacman -Syu
		sudo pacman -S --needed $ARCH_TAURI_DEPS 
	elif command -v dnf >/dev/null; then
		echo "Detected dnf!"
		echo "Installing dependencies with dnf..."

		FEDORA_TAURI_DEPS="webkit2gtk3-devel.x86_64 openssl-devel curl wget libappindicator-gtk3 librsvg2-devel" # Tauri dependencies

		sudo dnf check-update
		sudo dnf install $FEDORA_TAURI_DEPS 
		sudo dnf group install "C Development Tools and Libraries"
	else
		log_err "Your Linux distro '$(lsb_release -s -d)' is not supported by this script. We would welcome a PR or some help adding your OS to this script. https://github.com/knot/spacedrive/issues"
		exit 1
	fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
		if ! command -v brew >/dev/null; then
			log_err "Homebrew was not found. Please install it using the instructions at https://brew.sh and try again."
			exit 1
		fi

		echo "Installing Homebrew dependencies..."

		if ! brew tap -q | grep -qx "knot/deps" >/dev/null; then
			echo "Creating Homebrew tap \`knot/deps\`..."
			brew tap-new knot/deps
		fi

    echo "Install Clang etc..."
    xcode-select --install
else
	log_err "Your OS ($OSTYPE) is not supported by this script. We would welcome a PR or some help adding your OS to this script. https://github.com/knot/spacedrive/issues"
	exit 1
fi
