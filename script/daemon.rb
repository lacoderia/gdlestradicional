#!/usr/bin/env ruby
require 'rubygems'
require 'daemons'

Daemons.run('twitter_stream.rb', log_output: true) 
