"""A tiny choose-your-own-adventure game for the command line."""


def choose(prompt, options):
    """Show numbered options and return the selected option's index."""
    print(f"\n{prompt}")
    for number, option in enumerate(options, start=1):
        print(f"  {number}. {option}")

    while True:
        answer = input("> ").strip()
        if answer.isdigit() and 1 <= int(answer) <= len(options):
            return int(answer) - 1
        print(f"Enter a number from 1 to {len(options)}.")


def play():
    print("=" * 42)
    print("         THE MOONLIT FOREST")
    print("=" * 42)
    print(
        "\nYou find a silver key on your doorstep with a note:"
        '\n"Return this to the old tower before moonrise."'
    )

    route = choose(
        "At the edge of the forest, two paths appear.",
        ["Follow the river", "Take the lantern-lit trail"],
    )

    if route == 0:
        print("\nA fox with a tangled paw watches you from the riverbank.")
        help_fox = choose(
            "What do you do?",
            ["Free the fox", "Keep walking"],
        )
        if help_fox == 0:
            print(
                "\nThe fox trots ahead and leads you to a hidden bridge."
                "\nYou reach the tower just in time. The key unlocks its"
                "\nclockwork door, and the forest lights up like the stars."
            )
            ending = "A helpful heart"
        else:
            print(
                "\nYou reach a broken bridge and have to turn back."
                "\nBy the time you find another way, moonrise has passed."
            )
            ending = "A missed moment"
    else:
        print("\nThe trail climbs to a hill overlooking the old tower.")
        destination = choose(
            "From here, you can see a cave and the tower gate.",
            ["Explore the cave", "Go straight to the tower"],
        )
        if destination == 0:
            print(
                "\nInside the cave, you find a map marked with a shortcut."
                "\nYou arrive at the tower before moonrise and unlock its"
                "\nclockwork door. A tiny moon rises inside."
            )
            ending = "A curious explorer"
        else:
            print(
                "\nThe tower gate is locked, but your silver key fits."
                "\nInside, a clockwork owl thanks you and flies into the night."
            )
            ending = "Right on time"

    print(f"\n--- Ending: {ending} ---")


def main():
    print("Welcome to a short adventure. Choose by entering an option number.")
    while True:
        play_again = choose("Ready to begin?", ["Start the adventure", "Quit"])
        if play_again == 1:
            print("\nThanks for playing!")
            return

        play()
        again = input("\nPlay again? (y/n) ").strip().lower()
        while again not in ("y", "n"):
            again = input("Please enter y or n: ").strip().lower()
        if again == "n":
            print("\nThanks for playing!")
            return


if __name__ == "__main__":
    main()
