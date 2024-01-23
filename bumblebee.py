import pyttsx3
import lyricsgenius

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Function to convert text to speech
def convert_to_speech(text):
    engine.say(text)
    engine.runAndWait()

# Function to fetch song lyrics
def get_song_lyrics(artist, title):
    genius = lyricsgenius.Genius("lxojx_fn2DloRib9nAPe1NdBFeh3u_PYNoQIAdLenEULcd258IuB2GvtKPsjXGLmPcJpUeKTiuJPqtLSzpUV9Q")  # Replace with your Genius API key
    song = genius.search_song(title, artist)
    return song.lyrics if song else None

# Function to play song lyrics
def play_song_lyrics(artist, title):
    lyrics = get_song_lyrics(artist, title)
    if lyrics:
        convert_to_speech(lyrics)
    else:
        print("Lyrics not found.")

# Example usage
if __name__ == "__main__":
    # Input song details
    artist = input("Enter artist name: ")
    title = input("Enter song title: ")

    # Play song lyrics using Bumblebee's voice box
    play_song_lyrics(artist, title)
