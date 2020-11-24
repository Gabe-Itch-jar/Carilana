import discord
from discord.ext import commands

import datetime
import time

b = commands.Bot(command_prefix="CariNoSpam bot")
b.remove_command("help")

time_window_milliseconds = 2500 //the user could only post ___ messages in (___) milliseconds
max_msg_per_window = 3 //the user could only post (___) messages in those ___ milliseconds
author_msg_times = {}

@b.event
async def on_ready():
    print("Ready")


@b.event
async def on_message(message):
    if message.author.id == b.user.id:
        pass
    global author_msg_counts
    author_id = message.author.id

    curr_time = datetime.datetime.now().timestamp() * 1000

    if not author_msg_times.get(author_id, False):
        author_msg_times[author_id] = []

    author_msg_times[author_id].append(curr_time)

    expr_time = curr_time - time_window_milliseconds

    expired_msgs = [
        msg_time for msg_time in author_msg_times[author_id]
        if msg_time < expr_time
    ]

    for msg_time in expired_msgs:
        author_msg_times[author_id].remove(msg_time)

    if len(author_msg_times[author_id]) > max_msg_per_window:
        print(f"[{datetime.datetime.now()}] {message.author} - Detected for Spamming - {message.guild}")
        embed = (discord.Embed(title="Spam Detection",
                                description=f"Stop spamming, {message.author.mention}!",
                                color=discord.Color.red()))
        await message.channel.send(embed=embed, delete_after=5)


b.run("Token")
